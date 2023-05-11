import { signOut,updateProfile } from 'firebase/auth'
import { AuthContext } from '../../context/AuthContext'
import { useContext,useEffect,useState} from 'react'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db,storage } from '../../firebase'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { collection,query, where,doc,setDoc, getDoc,getDocs, updateDoc} from 'firebase/firestore'
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMediaQuery } from 'react-responsive';
const  Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  const [editUserName,setEditUserName]=useState(false)
   const [editName,setEditName]=useState(false)
   const [show, setShow] = useState(false);
    const [img,setImg]=useState()
     const [displayN,setDisplayN]=useState('')
    const [val,setVal]=useState([])
    const [image,setImage]=useState([])
    const [imgurl,setImgUrl]=useState('')
    const [loop,setLoop]=useState(false)
    const [imgloop,setImgloop]=useState(false)
    const desktopLaptop = useMediaQuery({
      query: '(min-width: 950px)'
    })
function handleClose() {
  setShow(false);
}
   function handleShow() {
    setShow(true);
    toast('Click on image again to change it')
   }
  
   // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{
  currentUser?.uid && keepLoggedCheck()
  async function keepLoggedCheck() {
const state= await getDoc(doc(db,"users",currentUser?.uid)) 
const val= await state.data().keeplogged
    window.addEventListener('beforeunload', function(event){
      event.preventDefault();
      event.returnValue = '';
      if (val==false) {
        signOut(auth)
      }
    })
  }

 },[currentUser?.uid])
   // eslint-disable-next-line react-hooks/exhaustive-deps
 useEffect(()=>{
  loop && val && changeName()
 async function changeName() {
  for(var i=0;i<val.length;i++) {
    const q = query(collection(db, "userChats"),where(`${val[i]}.displayName`, "==", currentUser?.displayName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
  await setDoc(doc.ref,{[`${val[i]}`]:{displayName:displayN}},{ merge: true })
  });
   }
   setLoop(false)
   await updateDoc(doc(db,"users",currentUser?.uid),{
    displayName:displayN
  })
  await updateProfile(auth.currentUser,{
    displayName:displayN
   })
 }
 },[loop])
useEffect(()=>{
  imgloop && image && imgurl && changeImage()
  async function changeImage () {
    for (var i=0;i<image.length;i++) {
      const q = query(collection(db, "userChats"),where(`${image[i]}.photoURL`, "==", currentUser?.photoURL));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
  await setDoc(doc.ref,{[`${image[i]}`]:{photoURL:imgurl}},{ merge: true })
  });
    }

    await updateDoc(doc(db,"users",currentUser?.uid),{
      photoURL:imgurl
    })
    await updateProfile(auth.currentUser,{
      photoURL:imgurl
    })
   
  }
  setImgloop(false)
},[imgloop])
 async function findName () {
  const usersRef = collection(db, "userChats")
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
 const arrays=Object.entries(doc.data())
 if (arrays.length>0) {
  const objects=arrays[0][1]
if (objects.displayName==currentUser?.displayName) {
  setVal(prev => [...prev,arrays[0][0]]);
}
 }
});
setLoop(true)
 }

 async function editN() {
  if (displayN.length<=20) {
 await findName()
  setEditName(false)
  } else{
    toast("displayname max characters is 20");
  }
}
async function findImage () {
  const usersRef = collection(db, "userChats")
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
 const arrays=Object.entries(doc.data())
if (arrays.length>0) {
  const objects=arrays[0][1]
  if (objects.photoURL==currentUser?.photoURL) {
    setImage(prev => [...prev,arrays[0][0] ]);
  }
}
});
setImgloop(true)
 }
img && updateImage()
  async function updateImage() {
    const date = new Date().getTime();
    const imgref = ref(storage, `images/${currentUser?.displayName + date}`);
    await uploadBytes(imgref,img);
    const url = await getDownloadURL(imgref);
    setImgUrl(url)
    setImg(null);
    await findImage()
  }

  return (
    <>
     <ToastContainer />
    <div className='Navbar'>
      <div className="user">
        <div className='profile'>
        <label  style={{cursor:'pointer'}}>  
        <img  alt='profilepic' onClick={handleShow}  src={currentUser?.photoURL}></img>
          </label>

   {editName || <span   onMouseOver={()=>{setEditUserName(true)}} onMouseLeave={()=>{setTimeout(()=>{setEditUserName(false)},3000)}}>{currentUser?.displayName}</span>}
{editName && <input onChange={(e)=>{setDisplayN(e.target.value)}} value={displayN}></input>}
{editName && <FontAwesomeIcon onClick={editN}  style={{cursor:'pointer'}} icon={faCheck}></FontAwesomeIcon>}
       { editUserName && <FontAwesomeIcon onClick={()=>{  setDisplayN(currentUser?.displayName)
        setEditName(true)}}  style={{cursor:'pointer'}} icon={faPenToSquare}></FontAwesomeIcon>}
        </div>
        
      </div>
      <>


      <Modal size={desktopLaptop?'sm':''} show={show} onHide={handleClose}>
        <Modal.Body >
         <label style={{cursor:'pointer'}} htmlFor="file" >
          <Image alt='profilepic' fluid src={currentUser?.photoURL}></Image>
          <input onChange={(e)=>{setImg(e.target.files[0])}} style={{ display: "none" }} id="file" type="file"></input>
          </label> 
          </Modal.Body>

      </Modal>
    </>

    </div>
    </>
  )
 }

export default Navbar