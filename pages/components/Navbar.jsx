import { signOut } from 'firebase/auth'
import { AuthContext } from './context/AuthContext'
import { useContext,useEffect } from 'react'
import { auth, db } from '../../firebase'
import Router from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { doc, getDoc, getDocs } from 'firebase/firestore'
import { userContext } from './context/user'
import { async } from '@firebase/util'
const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
const {keep} =useContext(userContext)
  function handleClick () {
    signOut(auth)
Router.push('/Login')
  }
 
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
  return (
    <div className='Navbar'>
      <span>Placid</span>
      <div className="user">
        {<img src={currentUser?.photoURL}></img>}
        {<span>{currentUser?.displayName}</span>}
        <FontAwesomeIcon style={{cursor:'pointer'}} onClick={handleClick} icon={faArrowRightFromBracket} />
       
      </div>
    </div>
  )
}

export default Navbar