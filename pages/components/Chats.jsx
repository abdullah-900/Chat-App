import React, { useContext } from 'react'
import { useState,useEffect} from 'react';
import { doc, onSnapshot,updateDoc,getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from './context/AuthContext';
import { userContext } from './context/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { render } from 'react-dom';
const Chats = () => {
  const {currentUser}=useContext(AuthContext)
 const {setSelectedUser}=useContext(userContext)
 const {setCombinedId}=useContext(userContext)
 const {combinedId}=useContext(userContext)
  const [chat,setChat]=useState()
  const [rerender,setRerender]=useState(false)
    useEffect(()=>{
      function getChat() {
      const unsub = onSnapshot(doc(db, "userChats",currentUser.uid ), (doc) => {
        setChat(doc.data()) 
    });
  
  }
  
  currentUser?.uid && getChat()
    },[currentUser])
   
      currentUser?.uid &&state()
      async function state () {
      const chats=await getDoc(doc(db, "userChats",currentUser?.uid));
    if (chats.data()) {
      const  data=Object.entries(chats.data())
      for (const a of data) {
        const uids=await getDoc(doc(db, "users",a[1].uid));
        await updateDoc(doc(db, "userChats", currentUser?.uid), {
          [a[0]+".state"] :{
           state:uids.data().state,
          }});  
      }
    }
  setRerender(!rerender)
      }
  
function handleOpen(d) {
setSelectedUser(d[1])
setCombinedId(d[0])
}

  return (
    <>
  
  {chat && Object.entries(chat).sort((a,b)=>a[1].date-b[1].date).map((chat) =>(
    <div className="Chats" key={chat[0]} onClick={()=>{handleOpen(chat)}}>
     <img src={chat[1].photoURL}></img>
    <div className="message">
        <span>{chat[1].displayName} {chat[1].state?.state?<FontAwesomeIcon style={{color:'green'}} size='2xs'  icon={faCircle} />:<FontAwesomeIcon style={{color:'gray'}} size='2xs'  icon={faCircle} />}</span> 
        <p>{chat[1].lastmessage?.text}</p>
      
        </div>
  </div>
  ))}
  </>
  )
}
export default Chats