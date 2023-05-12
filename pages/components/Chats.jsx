import React, { useContext } from 'react'
import { useState,useEffect} from 'react';
import { doc, onSnapshot,updateDoc,getDoc,deleteField  } from "firebase/firestore";
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import { userContext } from '../../context/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { useMediaQuery } from 'react-responsive';

const Chats = () => {
  const desktopLaptop = useMediaQuery({
    query: '(min-width: 950px)'
  })
  const [show, setShow] = useState(false);
  const {currentUser}=useContext(AuthContext)
 const {setSelectedUser}=useContext(userContext)
 const {selectedUser}=useContext(userContext)
 const {setCombinedId}=useContext(userContext)
 const {combinedId}=useContext(userContext)
 const {setMessages}=useContext(userContext)
  const [chat,setChat]=useState()

    useEffect(()=>{
      function getChat() {
      const unsub = onSnapshot(doc(db, "userChats",currentUser?.uid ), (doc) => {
        setChat(doc.data()) 
    });
  
  }
  
  currentUser?.uid && getChat()
    },[currentUser])
   
    useEffect(()=>{
      currentUser?.uid && state()
      async function state () {
        const chats=await getDoc(doc(db, "userChats",currentUser?.uid));
      if (chats.data()) {
        const  data=Object.entries(chats.data())
        for (const a of data) {
          if (a[1].uid) {
            const uids=await getDoc(doc(db, "users",a[1].uid));
          await updateDoc(doc(db, "userChats", currentUser?.uid), {
            [a[0]+".state"] :{
             state:uids.data().state,
            }});  
         
          }
        }
      }
    
        }
    
    },[currentUser?.uid,selectedUser?.uid])
  
function handleOpen(d) {

setSelectedUser(d[1])
setCombinedId(d[0])
}

async function handleRemove(e) {
  e.stopPropagation()
  await updateDoc(doc(db,"userChats",currentUser?.uid), {
    [combinedId]:deleteField()
});
if (selectedUser?.uid) {
  await updateDoc(doc(db,"userChats",selectedUser?.uid), {
    [combinedId]:deleteField()
  });
} 
setMessages()
setSelectedUser()
}

  return (
    <>
  {chat && Object.entries(chat).sort((a,b)=>a[1].date-b[1].date).map((chat) =>(
    <div className="Chats" key={chat[0]} onClick={()=>{handleOpen(chat)}}>
      <div className='avatar'>
     <img onClick={()=>setShow(true)} alt='profilepic' src={chat[1].photoURL}></img>
    <div className="message">
      <div className='state'>
        <span>{chat[1].displayName}</span>
        {chat[1].state?.state?<FontAwesomeIcon style={{color:'green'}} size='2xs'  icon={faCircle} />:<FontAwesomeIcon style={{color:'gray',alignSelf:'center',justifySelf:'center'}} size='2xs'  icon={faCircle} />}
        
        </div> 
        {(chat[1].lastmessage?.text) ?  <p>{chat[1].lastmessage?.text}</p>:'' } 
        </div>
        </div>
        {combinedId && <FontAwesomeIcon  onClick={handleRemove} icon={faXmark} />}
        <Modal  size={desktopLaptop?'sm':''} show={show} onHide={()=>setShow(setShow(false))}>
        <Modal.Body >
          <Image style={{cursor:'pointer'}} alt='sent message' fluid src={chat[1].photoURL}></Image>
          </Modal.Body>

      </Modal>
  </div>
  
  ))}
  </>
  )
}
export default Chats