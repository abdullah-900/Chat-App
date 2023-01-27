import { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { userContext } from './context/user'
import { doc, onSnapshot } from "firebase/firestore";
import {db} from "../../firebase"
const Messages = () => {
  const [messages,setMessages]=useState([])
  const {combinedId}=useContext(userContext)
  
useEffect(()=>{
   function getmessage () {
    const unsub = onSnapshot(doc(db, "Chats", combinedId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
  });

   }
combinedId && getmessage()
},[combinedId])
  return (
    <div className='messages'>
       {messages?.map((m)=>( <Message message={m} key={m.id}/>))}
    </div>
  )
}

export default Messages