import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar'>
      <span className='logo'>Chatium</span>
      <div className="user">
        <img  src="/man.png"></img>
        <span>display name</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar