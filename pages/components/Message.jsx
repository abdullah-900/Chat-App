import {use, useContext, useState,useEffect, useRef} from 'react'
import { AuthContext } from './context/AuthContext'
import {userContext} from './context/user'
import { db } from '../../firebase'
import { onSnapshot,doc } from 'firebase/firestore'
const Message = ({message}) => {
  const ref=useRef()
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:'smooth'})
  },[message])
  const {currentUser}=useContext(AuthContext)
  const {combinedId}=useContext(userContext)
const {selectedUser}=useContext(userContext)
console.log (message)
console.log(currentUser)
console.log(selectedUser)
  return (
    <div ref={ref} className={`message ${message.senderId===currentUser.uid && "owner"}`}>
      <div className='messageinfo'>
      <img src={message.senderId===currentUser.uid ?currentUser.photoURL:selectedUser.photoURL}></img>
      <span>just now</span>
      </div>
      
      <div className='messagecontent'>
      <p>{message.message}</p>
      <img src={message.img}></img>
      </div>
      </div>
  )
}

export default Message