import React from 'react'
import Link from 'next/link'
import {useState, useContext,useEffect } from "react";
import { AuthContext } from "./components/context/AuthContext";
import Router, { useRouter } from "next/router";
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () => {
  const [error,setError]=useState(false)
 
  const {currentUser}=useContext(AuthContext)
 



 async function handleSubmit(e) {
  e.preventDefault();
  try {
 const email=e.target[0].value;
 const password=e.target[1].value;
await signInWithEmailAndPassword(auth, email, password)

Router.push('/Home')

  }
catch{
setError(true)
}
  
}
  return (
    <div className='formContainer'>
     <div className='formWrapper'>
      <span>
        <img  src='/Logo.png'></img>
      </span>
      <form onSubmit={handleSubmit}>
      <input type='email' placeholder='email'></input> 
      <input type='password' placeholder='password'></input> 
      <button>sign in</button>
      <p>you don't have an account ? <Link href='/Register'>Register</Link></p>
      {error && <p>something went wrong</p>}
      </form>
      </div>
    </div>
  )
}

export default Login