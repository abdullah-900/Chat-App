import { useEffect, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc,collection,query,getDocs,where } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [error, setError] = useState(false);
  const [err,setErr]=useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router=useRouter()
  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const date = new Date().getTime();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    const usersRef = collection(db, "users")
    const q = query(usersRef, where("displayName", "==", displayName));
    const querySnapshot = await getDocs(q);
    const exists = !querySnapshot.empty
    if (exists) {
      setErr(true)
      setIsLoading(false);
    }else{
      try {
        if (typeof window !== 'undefined') {
          // create a new image element
      const img = new Image();
      
      // set the source of the image
      img.src = "/blank.png";
      
        }
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
       
        const imgref = ref(storage, `images/${displayName + date}`);
        
        if (file) { await uploadBytes(imgref, file);
        }else {
          const imgUrl = 'https://i.imgur.com/OAI1jMl.png';
          const response = await fetch(imgUrl);
          const blob = await response.blob();
          await uploadBytes(imgref, blob);
        }
        const url = await getDownloadURL(imgref);
        const profile = await updateProfile(response.user, {
          displayName,
          photoURL: url,
        });
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName: displayName,
          email: email,
          photoURL: url,
          state:false,
          keeplogged:false,
        });
        await setDoc(doc(db, "userChats", response.user.uid), {
        
        });
        signOut(auth)
        router.push('/Login')
      
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    }
  
  }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span>
          <img src="/Logo.png"></img>
        </span>
       
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="display name"></input>
          <input type="email" placeholder="email"></input>
          <input type="password" placeholder="password"></input>
          <label htmlFor="file">
            Add an avatar
            <img
              style={{ width: "32px", height: "32px" }}
              src={"/avatar.png"}
            ></img>
            <input style={{ display: "none" }} id="file" type="file"></input>
          </label>
          <button type="submit" disabled={isLoading}>{isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : 
        'SignUp'
      }</button>
          <p>you already have an account ? <Link href="/Login">log in</Link> </p>
          {error && <span>something went wrong</span>}
          {err && <span>display Name already taken</span>}
        </form>
      </div>
    </div>
  );
};
export default Register;
