import React from 'react'
import Navbar from './Navbar'
import Chats from './Chats'
import Search from './Search'
const SideBar = () => {
  return (
    <div className="sideBar">
   <Navbar/>
   <Search/>  
  <Chats/>
  </div>
  )
}

export default SideBar