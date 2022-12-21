import React from 'react'

const Message = () => {
  return (
    <div className='message owner'>
      <div className='messageinfo'>
      <img src='/man.png'></img>
      <span>just now</span>
      </div>
      
      <div className='messagecontent'>
      <p>message</p>
      <img src='https://images.pexels.com/photos/458766/pexels-photo-458766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'></img>
      </div>
      </div>
  )
}

export default Message