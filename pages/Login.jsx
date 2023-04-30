import React from 'react'
import Link from 'next/link'
import {useState, useContext,useEffect} from "react";
import { AuthContext } from './components/context/AuthContext';
import Router from "next/router";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { doc,setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const Login = () => {
  const [error,setError]=useState(false)
  const [keep,setKeep]=useState(false)
const {currentUser}=useContext(AuthContext)
const [isLoading, setIsLoading] = useState(false);
useEffect (()=>{

  currentUser?.uid && updatelog()
  async function updatelog() {
    if (keep) {
      await setDoc(doc(db, 'users', currentUser?.uid), { keeplogged: true }, { merge: true });
     }else {
      await setDoc(doc(db, 'users', currentUser?.uid), { keeplogged: false }, { merge: true });
     }
  }
},[currentUser?.uid,keep])
 async function handleSubmit(e) {
  setIsLoading(true)
  e.preventDefault();
  try {
 const email=e.target[0].value;
 const password=e.target[1].value;
await signInWithEmailAndPassword(auth, email, password)
Router.push('/Home')

  }
catch{
setError(true);
setIsLoading(false);
}
  
}

  return (
    <div className='formContainer'>
     <div className='formWrapper'>
      
        <img  src='/Logo.png'></img>
   
      <form onSubmit={handleSubmit}>
      <input type='email' placeholder='email'></input> 
      <input type='password' placeholder='password'></input>
      <div className='checkbox'>
      <input onChange={e=>setKeep(e.target.checked)} type='checkbox' id='login'></input>
      <label htmlFor='login'>keep me logged in</label>
      </div>
      <button type="submit" disabled={isLoading}>{isLoading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : 
        'Login'
      }</button>
      <p>you don't have an account ? <Link href='/Register'>Register</Link></p>
      {error && <p>something went wrong</p>}
      </form>
      </div>
    </div>
  )
}

export default Login