import React, { useContext } from 'react'
import { useState,useEffect,createContext } from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from './context/AuthContext';
import { userContext } from './context/user';
import { map } from 'lodash';
const Chats = () => {
  const {currentUser}=useContext(AuthContext)
 const {setSelectedUser}=useContext(userContext)
 const {setCombinedId}=useContext(userContext)
  const [chat,setChat]=useState()
  
    useEffect(()=>{
      function getChat() {
      const unsub = onSnapshot(doc(db, "userChats",currentUser.uid ), (doc) => {
        setChat(doc.data()) 
       
    });
  }
  currentUser?.uid && getChat()
    },[currentUser])
 

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
        <span>{chat[1].displayName}</span>
        <p>{chat[1].lastmessage?.text}</p>
        </div>
    
  </div>
  ))}
 
 
  </>
  )
}

export default Chats