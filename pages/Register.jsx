import React from 'react'

const Register = () => {
  return (
    <div className='formContainer'>
     <div className='formWrapper'>
      <span className='logo'>chatium</span >
      <span className='title'>Reigster</span>
      <form>
      <input type='text' placeholder='display name'></input> 
      <input type='email' placeholder='email'></input> 
      <input type='password' placeholder='password'></input>
      <label htmlFor="file">Add an avatar
      <img style={{width:'32px', height:'32px'}} src='/avatar.png'></img>
      <input style={{display:'none'}} id="file" type='file'></input> 
      </label>
      <button>sign up</button>
      <p>you already have an account ? sign in</p>
      </form>
      </div>
    </div>
  )

}
export default Register