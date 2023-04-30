import {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket,faBars} from '@fortawesome/free-solid-svg-icons'
import { userContext } from '../../context/user'
import { signOut } from 'firebase/auth'
import Router from 'next/router'
import { auth } from '../../firebase'
const Infobar = ({s,v}) => {

  const {selectedUser}=useContext(userContext)
  function handleClick () {
    signOut(auth)
Router.push('/Login')
  }
  return ( 
    <div className='Infobar'>
  {v?<FontAwesomeIcon rotation={90} style={{cursor:'pointer'}} onClick={()=>{s(!v)}} icon={faBars} />:<FontAwesomeIcon style={{cursor:'pointer'}} onClick={()=>{s(!v)}} icon={faBars}  />}
    <span>{selectedUser?.displayName}</span>
    <div className='icons'>
    <FontAwesomeIcon   style={{cursor:'pointer'}} onClick={handleClick} icon={faArrowRightFromBracket} />

    </div>
  </div>
  )
}

export default Infobar