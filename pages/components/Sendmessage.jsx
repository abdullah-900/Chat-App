import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'
import {faImage} from '@fortawesome/free-regular-svg-icons'
const Sendmessage = () => {
  return (
    <div className='sendmessage'>
            <input placeholder='Type something...' type="text" />
            <label htmlFor='upload'>
            <input id='upload' style={{display:'none'}} type='file'></input>
            <FontAwesomeIcon style={{color:'gray',cursor:'pointer'}} icon={faPaperclip}/>
            </label>
            <label htmlFor='up'>
            <input id='up' style={{display:'none'}} type='file'></input>
            <FontAwesomeIcon style={{color:'gray',cursor:'pointer'}}  icon={faImage}/>
            </label>
            <button>send</button>
    </div>
  )
}
export default Sendmessage