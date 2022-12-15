import React from 'react'

const SideBar = () => {
  return (
    <div className="sideBar">
    <div className="infoBar">
      <span>chatium</span>
      <div className="userName">
        <img src="/man.png"></img>
        <span>display name</span>
        <button>logout</button>
      </div>
    </div>
    <input placeholder="Find a user" type="text"></input>
    <div className="user">
      <img src="/man.png"></img>
      <span>display name</span>
    </div>
    <div className="user">
      <img src="/man.png"></img>
      <span>display name</span>
    </div>
    <div className="user">
      <img src="/woman.png"></img>
      <span>display name</span>
    </div>
    <div className="user">
      <img src="/woman.png"></img>
      <span>display name</span>
    </div>
    <div className="user">
      <img src="/man.png"></img>
      <span>display name</span>
    </div>
  </div>
  )
}

export default SideBar