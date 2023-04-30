import Infobar from './Infobar'
import Messages from './Messages'
import Sendmessage from './Sendmessage'
const Chat = ({set,val}) => {

  return (
   <div style={val ? {}:{borderRadius:'8px'}} className='Chat'>
   <Infobar s={set} v={val}/>
   <Messages/>
 <Sendmessage/>
    </div>
  )
}

export default Chat