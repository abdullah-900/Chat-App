import {useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus,faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { userContext } from './context/user'
const Infobar = () => {
  const {selectedUser}=useContext(userContext)
  return (
    <div className='Infobar'>
    <span>{selectedUser?.displayName}</span>
    <div className='icons'>
    <FontAwesomeIcon icon={faUserPlus} />
    <FontAwesomeIcon icon={faEllipsis} />
    </div>
  </div>
  )
}

export default Infobar