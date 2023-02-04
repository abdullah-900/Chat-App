import {useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
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
  const [text,setText]=useState('')
  const [img,setImg]=useState('')
 const sendButton={color:'#009eff',cursor:'pointer'}
 async function handleSend () {
 let id=uuid();
    if(img) {
      const imgref = ref(storage, `images/${uuid()}`);
      await uploadBytes(imgref,img);
      const url = await getDownloadURL(imgref);
      await updateDoc(doc(db, "Chats", combinedId), {
        messages: arrayUnion({
        id:id,
        message:text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        img:url,
        })
      });
    }else{
      await updateDoc(doc(db, "Chats", combinedId), {
        messages: arrayUnion({
        id:id,
        message:text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        })
      });
    }
    await updateDoc(doc(db, "userChats", currentUser.uid), {
   [combinedId+".lastmessage"] :{
    text,
    id:id,
   },
   [combinedId+".date"]:serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", selectedUser.uid), {
      [combinedId+".lastmessage"] :{
       text,
       id:id,
      },
      [combinedId+".date"]:serverTimestamp()
       });
  
    setText("")
  }
  return (
    <div className='sendmessage'>
            <input  value={text} onChange={e=>setText(e.target.value)} placeholder='Type something...' type="text" />
            <label htmlFor='up'>
            <input  onChange={e=>setImg(e.target.files[0])} id='up' style={{display:'none'}} type='file'></input>
            <FontAwesomeIcon style={{color:'gray',cursor:'pointer'}}  icon={faImage}/>
            </label>
            {selectedUser?<FontAwesomeIcon style={text?sendButton:{color:'grey'}} onClick={()=>{if(text || img) handleSend()}} icon={faPaperPlane} />:<FontAwesomeIcon style={{color:'grey'}} icon={faPaperPlane}/>}
    </div>
  )
}
export default Sendmessage