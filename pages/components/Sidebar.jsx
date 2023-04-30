import React from 'react'
import Navbar from './Navbar'
import Chats from './Chats'
import Search from './Search'
const SideBar = ({s}) => {

  return (
    <div className="sideBar">
   <Navbar m={s}/>
   <Search/>  
  <Chats/>
  </div>
  )
}

export default SideBar