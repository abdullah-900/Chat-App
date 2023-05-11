import {useContext,useEffect,useRef,useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import {userContext} from '../../context/user'
import { doc,updateDoc,getDoc, arrayRemove } from "firebase/firestore";
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { useMediaQuery } from 'react-responsive';
import { ModalHeader } from 'react-bootstrap';
const Message = ({message}) => {
  const [check,setCheck]=useState(false)
  const [date,setDate]=useState('')
  const {combinedId}=useContext(userContext)
  const {currentUser}=useContext(AuthContext)
  const {selectedUser}=useContext(userContext)
  const [show, setShow] = useState(false);
  const desktopLaptop = useMediaQuery({
    query: '(min-width: 950px)'
  })
  const ref=useRef()

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])
useEffect (()=>{
  setDate(message.date?.toDate().toLocaleTimeString())
},[selectedUser])
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
    <div ref={ref} className={`message ${message?.senderId===currentUser?.uid && "owner"}`}>
      <div className='messageinfo'>
      <img alt='profilepic' src={message?.senderId===currentUser?.uid ?currentUser.photoURL:selectedUser?.photoURL}></img>
      <span>{date}</span>
      </div>
      
      <div className='messagecontent' onMouseLeave={()=>{setCheck(false)}}  onMouseOver={handleMouse}>
       {check && <FontAwesomeIcon  style={{cursor:'pointer',alignSelf:'center',justifySelf:'flex-start'}} onClick={()=>{handleDelete(message?.id)}} icon={faXmark} /> }
      {message?.message==""?<span></span>:<p>{message?.message}</p>}
      {message?.img && <img onClick={()=>setShow(true)} alt='sentimage' style={{}} src={message?.img}></img>}
      </div>
      <Modal size={desktopLaptop?'sm':''} show={show} onHide={()=>setShow(setShow(false))}>
        <Modal.Body >
          <Image alt='sent message' fluid src={message?.img}></Image>
          </Modal.Body>

      </Modal>

 
      </div>
  )
}

export default Message