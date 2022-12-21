import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo,faUserPlus,faEllipsis } from '@fortawesome/free-solid-svg-icons'
const Infobar = () => {
  return (
    <div className='Infobar'>
    <span>display name</span>
    <div className='icons'>
    <FontAwesomeIcon icon={faVideo} />
    <FontAwesomeIcon icon={faUserPlus} />
    <FontAwesomeIcon icon={faEllipsis} />
    </div>
  </div>
  )
}

export default Infobar