import React from 'react'

const Login = () => {
  return (
    <div className='formContainer'>
     <div className='formWrapper'>
      <span className='logo'>chatium</span>
      <span className='title'>Login</span>
      <form>
      <input type='email' placeholder='email'></input> 
      <input type='password' placeholder='password'></input> 
      <button>sign in</button>
      <p>you don't have an account ? Register</p>
      </form>
      </div>
    </div>
  )
}

export default Login