import {useState,useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage} from '@fortawesome/free-regular-svg-icons'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons'
import { db,storage } from '../../firebase'
import { doc,  updateDoc , arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore"; 
import { userContext } from './context/user'
import {AuthContext} from './context/AuthContext'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytes,getDownloadURL} from "firebase/storage";
import Spinner from 'react-bootstrap/Spinner';
const Sendmessage = () => {
  const {currentUser}=useContext(AuthContext)
  const {selectedUser}=useContext(userContext)
  const {combinedId}=useContext(userContext)
  const [text,setText]=useState('')
  const [img,setImg]=useState('')
  const [show,Setshow]=useState(false)
  const [loading,setLoading]=useState(false)
 const sendButton={color:'#009eff',cursor:'pointer'}
const [smiles,setSmiles]=useState([])
console.log(img)
 async function emoji(keyword) {
  const face= await fetch (`https://emojihub.yurace.pro/api/all/category/${keyword}`)
  const lst= await face.json()
  const val=[]
for (const a of lst) {
val.push(a.unicode[0])
}

setSmiles(val)
 }

 const updateString = (event) => {
  const buttonString = event.target.innerText;
  setText (prevString => prevString + buttonString);
}
 async function handleSend () {
 let id=uuid();
    if(img) {
      setLoading(true)
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
      setLoading(false)
      setText('')
      setImg('')
    }else{
      await updateDoc(doc(db, "Chats", combinedId), {
        messages: arrayUnion({
        id:id,
        message:text,
        senderId:currentUser.uid,
        date:Timestamp.now(),
        })
      });
      setText('')

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
    <>
    <div className='sendmessage'>
            <input  value={text} onChange={e=>setText(e.target.value)} placeholder='Type something...' type="text" />
            <FontAwesomeIcon onClick={()=>{Setshow(!show)}} icon={faFaceSmile} style={{color:'gray',cursor:'pointer'}} />
            <label htmlFor='up'>
            <input  onChange={e=>setImg(e.target.files[0])} id='up' style={{display:'none'}} type='file'></input>
            <FontAwesomeIcon style={{color:'gray',cursor:'pointer'}}  icon={faImage}/>
            </label>
            {selectedUser?<FontAwesomeIcon style={text || img ?sendButton:{color:'grey'}} onClick={()=>{if(text || img) handleSend()}} icon={faPaperPlane} />:<FontAwesomeIcon style={{color:'grey'}} icon={faPaperPlane}/> }
            { loading && <Spinner size='sm' animation="border" role="status"></Spinner>}
           
           
    </div>
  {show &&

  <div className='emojiList'>
    <div className='emojiGroups'>
    <span onClick={()=>{emoji('smileys-and-people')}}>😂</span>
    <span onClick={()=>{emoji('animals-and-nature')}}>🐶</span>
    <span onClick={()=>{emoji('food-and-drink')}}>🍎</span>
    <span onClick={()=>{emoji('travel-and-places')}}>🌍</span>
    <span onClick={()=>{emoji('activities')}}>⛹</span>
    <span onClick={()=>{emoji('objects')}}>🔑</span>
    </div>
    <div className='emojis'>
    {smiles.map(sm => (
  <span style={{cursor:'pointer'}} onClick={updateString}>{String.fromCodePoint(parseInt(sm.replace("U+", ""), 16))}</span>
))}
    </div>

</div>
 }
    </>
  )
}
export default Sendmessage