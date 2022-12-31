import React from 'react'
import { signOut } from 'firebase/auth'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'
import { auth } from '../../firebase'
import Router from 'next/router'
const Navbar = () => {
  const {currentUser}=useContext(AuthContext)


  function handleClick () {
    signOut(auth)
Router.push('/Login')
  }
  return (
    <div className='Navbar'>
      <span className='logo'>Placid</span>
      <div className="user">
        <img src="/man.png"></img>
        {currentUser?<span>{currentUser.displayName}</span>:<span>displayName</span>}
        <button onClick={handleClick}>logout</button>
      </div>
    </div>
  )
}

export default Navbar