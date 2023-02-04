import {useContext,useEffect,useRef,useState} from 'react'
import { AuthContext } from './context/AuthContext'
import {userContext} from './context/user'
import { doc,updateDoc,getDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'

const Message = ({message}) => {
  const [check,setCheck]=useState(false)
  const {combinedId}=useContext(userContext)
  const {currentUser}=useContext(AuthContext)
  const {selectedUser}=useContext(userContext)
  const ref=useRef()


  async function trytech() {
    const lastm1=await getDoc(doc(db, "userChats",currentUser?.uid))
    const lastm2=await getDoc(doc(db,"userChats",selectedUser?.uid))
    const dellast1=Object.entries(lastm1.data())
    const dellast2=Object.entries(lastm2.data())
for (const a of dellast1) {
  if (a[0]===combinedId && a[1].lastmessage.senderId===currentUser.uid) {
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [a[0]+".lastmessage"] :{
      },
       });
  }
}
  }
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])
const date =message.date?.toDate().toLocaleTimeString()
async function handleDelete(e) {
  const chats=await getDoc(doc(db, "Chats",combinedId));
  const lastm1=await getDoc(doc(db, "userChats",currentUser?.uid))
  const lastm2=await getDoc(doc(db,"userChats",selectedUser?.uid))
  const dellast1= Object.entries(lastm1.data())
  const dellast2=Object.entries(lastm2.data())
  const messages=Object.entries(chats.data())
  const messagesarr=messages[0][1]
  for(const a of messagesarr) {
    if (a.id===e && a.senderId===currentUser.uid ) {
        await updateDoc(doc(db, "Chats", combinedId), {
          messages:arrayRemove(a)
      });
    }
    for (const a of dellast1) {
      if (a[0]===combinedId && a[1].lastmessage.id===e) {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [a[0]+".lastmessage"] :{
          },
           });
      }
    }
    for (const a of dellast2) {
      if (a[0]===combinedId && a[1].lastmessage.id===e) {
        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [a[0]+".lastmessage"] :{
          },
           });
      }
    }
  }

}
function handleMouse () {
  if (message.senderId===currentUser?.uid) {
    setCheck(true)
  }

}
  return (
    <div ref={ref} className={`message ${message.senderId===currentUser?.uid && "owner"}`}>
      <div className='messageinfo'>
      <img src={message.senderId===currentUser?.uid ?currentUser.photoURL:selectedUser?.photoURL}></img>
      <span>{date}</span>
      </div>
      
      <div className='messagecontent' onMouseLeave={()=>{setCheck(false)}}  onMouseOver={handleMouse}>
       {check && <FontAwesomeIcon  style={{alignSelf:'center',justifySelf:'flex-start'}} onClick={()=>{handleDelete(message.id)}} icon={faXmark} /> }
      {message.message==""?<span></span>:<p>{message.message}</p>}
      <img src={message.img}></img>
      </div>
      </div>
  )
}

export default Message