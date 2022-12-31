import React, { use, useState } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";


const Register = () => {
  const [error, setError] = useState(false);
  const router=useRouter()
  async function handleSubmit(e) {
    e.preventDefault();
    const date = new Date().getTime();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
     
      const imgref = ref(storage, `images/${displayName + date}`);
      const img = await uploadBytes(imgref, file);
      const url = await getDownloadURL(imgref);
      const profile = await updateProfile(response.user, {
        displayName,
        photoURL: url,
      });
      const document = await setDoc(doc(db, "users", response.user.uid), {
        uid: response.user.uid,
        displayName: displayName,
        email: email,
        photoURL: url,
        
      });
      const chats=await setDoc(doc(db, "userChats", response.user.uid), {
     
      });
      router.push('/Home')

    } catch (error) {
      setError(true);
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
          <button>sign up</button>
          <p>you already have an account ? <Link href="/Login">log in</Link> </p>
          {error && <span>something went wrong</span>}
        </form>
      </div>
    </div>
  );
};
export default Register;
