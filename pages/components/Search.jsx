import { useState,useContext } from 'react'
import { AuthContext } from './context/AuthContext';
import { collection,setDoc, query, where,getDocs,updateDoc, serverTimestamp,doc,getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
const Search = () => {
  const {currentUser}=useContext(AuthContext)
  const [username,setUserName]=useState("")
  const [user,setUser]=useState(null)
  const [err,setErr]=useState(false)

  function handleKey(e) {
    e.code==="Enter"&& handleSearch();
   }
 async function handleSearch() {
try {
  
    const usersRef = collection(db, "users")
  const q = query(usersRef, where("displayName", "==", username));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
   setUser(doc.data()) 
});
  if(user==null) { 
    setErr(true) 
  }

  
} catch (error) {
  console.log('error')
}  
  }
 async function handleSelect() {
  setUser(null)
  setErr(false)
  setUserName("")
  const combinedId=currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid
  try {
    const res=await getDoc(doc(db, "Chats", combinedId));
    if (!res.exists() && username!==currentUser.displayName ) {
      await setDoc(doc(db, "Chats", combinedId), {messsages:[]});
      await updateDoc(doc(db,"userChats",currentUser.uid), {
        [combinedId]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL,
          date:serverTimestamp(),
          
        },
    });
    await updateDoc(doc(db,"userChats",user.uid), {
      [combinedId]:{
        uid:currentUser.uid,
        displayName:currentUser.displayName,
        photoURL:currentUser.photoURL,
        date:serverTimestamp(),
        
      },
  });
  
    }
    
   
  } catch (error) {
    console.log('error')
  }
  
  }


if (user) {
  return (
    <div className="search">
      <input value={username} placeholder="Find a user" onKeyDown={handleKey} type="text" onChange={(e)=>setUserName(e.target.value)}></input>
      <div className='adduser'>
      <div  className='userinfo'>
    {<img src={user?.photoURL}></img>}
    {<span>{user?.displayName}</span>} 
    </div>
    <FontAwesomeIcon style={{cursor:'pointer'}} onClick={handleSelect} icon={faUserPlus} />
      </div>
    
    
    </div>
  )
}else {
  return(
  <div className="search">
   
      <input value={username} placeholder="Find a user" onKeyDown={handleKey} type="text" onChange={(e)=>setUserName(e.target.value)}></input>
      {err && <span>user not found <button onClick={()=>{
        setErr(false)
        setUserName("")
        }} style={{border:'none',backgroundColor:'transparent',cursor:'pointer'}}>X</button> </span> }
    </div>
  )
}
}

export default Search