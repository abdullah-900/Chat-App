import {useContext,useEffect,useRef} from 'react'
import { AuthContext } from './context/AuthContext'
import {userContext} from './context/user'
import { doc,updateDoc,getDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

const Message = ({message}) => {
  const {combinedId}=useContext(userContext)
  const ref=useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])
  const {currentUser}=useContext(AuthContext)
const {selectedUser}=useContext(userContext)
const date =message.date?.toDate().toLocaleTimeString()
async function handleDelete() {
  const chats=await getDoc(doc(db, "Chats",combinedId));
  const lastmessage=await getDoc(doc(db, "userChats",currentUser.uid))
  const messages=Object.entries(chats.data())
  const messagesarr=messages[1][1]
  for(const a of messagesarr) {
    if (a.senderId===currentUser.uid) {
      await updateDoc(doc(db, "Chats", combinedId), {
        messages:arrayRemove(a)
    });
    }
  }
}

  return (
    <div ref={ref} className={`message ${message.senderId===currentUser?.uid && "owner"}`}>
      <div className='messageinfo'>
      <img src={message.senderId===currentUser?.uid ?currentUser.photoURL:selectedUser?.photoURL}></img>
      <span>{date}</span>
      </div>
      
      <div className='messagecontent'>
       {message.senderId===currentUser?.uid && <FontAwesomeIcon onClick={handleDelete} icon={faXmark} /> }
      {message.message==""?<span></span>:<p onClick={()=>{alert('hello')}}>{message.message}</p>}
      <img src={message.img}></img>
      </div>
      </div>
  )
}

export default Message