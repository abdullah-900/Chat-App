import React ,{useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import { db,storage } from '../../firebase'
import { doc,  updateDoc , arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore"; 
import { userContext } from './context/user'
import {AuthContext} from './context/AuthContext'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";

const Sendmessage = () => {
  const {currentUser}=useContext(AuthContext)
  const {selectedUser}=useContext(userContext)
  const {combinedId}=useContext(userContext)
  
  const {setMessage}=useContext(userContext)
  const [text,setText]=useState('')
  const [img,setImg]=useState('')

  console.log(combinedId)
 async function handleSend () {
    if(img) {
      const imgref = ref(storage, `images/${uuid()}`);
      await uploadBytes(imgref,img);
      const url = await getDownloadURL(imgref);
      await updateDoc(doc(db, "Chats", combinedId), {
        messages: arrayUnion({
        id:uuid(),
        message:text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        img:url,
        })
      });
    }else{
      await updateDoc(doc(db, "Chats", combinedId), {
        messages: arrayUnion({
        id:uuid(),
        message:text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        })
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
   [combinedId+".lastmessage"] :{
    text,
   },
   [combinedId+".date"]:serverTimestamp()
    });
    await updateDoc(doc(db, "userChats", selectedUser.uid), {
      [combinedId+".lastmessage"] :{
       text,
      },
      [combinedId+".date"]:serverTimestamp()
       });
    setText('')
    setImg('')
    
  }
  console.log(selectedUser)
  return (
    <div className='sendmessage'>
            <input  value={text} onChange={e=>setText(e.target.value)} placeholder='Type something...' type="text" />
            <label htmlFor='up'>
            <input value={img} onChange={e=>setImg(e.target.files[0])} id='up' style={{display:'none'}} type='file'></input>
            <FontAwesomeIcon style={{color:'gray',cursor:'pointer'}}  icon={faImage}/>
            </label>
            <button onClick={()=>{handleSend()}}>send</button>
    </div>
  )
}
export default Sendmessage