import React, { useState } from 'react';
import './Message.css';

const Message = props => {
    const [msg, setMsg] = useState('');
    const [messages,setMessages] = useState([]);
    const messageHandler = (e) => {
        setMsg(e.target.value);
    }
    const postMessage = () => {
        const newMsg = [...messages];
        newMsg.push(msg)
        setMessages(newMsg);
    }
    return (
        <div className='message-container'>
            <div className='message-top row' style={{position: 'relative'}}>
                <div className='col s2 m2 l2'>
                    <div className='message-img'>
                        <img src={props.location.state.chatUser.profileUrl} alt='...' className='responsive-img'/>
                    </div>    
                 </div>
                 <div className='col s10 m10 l10'>
                    <div className='message-name grey-text text-darken-1'>
                         {props.location.state.chatUser.name}
                    </div>    
                 </div>
             </div>
             <div className='message-body white'>
            
                   {messages.map((mes, i) => {
                      return <div key = {i} className= 'messages' style={{position : 'relative',marginBottom : '10px'}}>
                      <div style={{display : 'inline-block', padding : '10px'}} className='blue white-text'>
                          {mes}  
                       </div>     
                   </div>
                   })} 
             </div>       
             <div className='row message-form'>
                    <div className='col m10 s10 l10 '>
                            <input type='text' className='msg-input browser-default' onChange={messageHandler}/>
                     </div>
                     <div className='col m2 s2 l2 red msg-send-btn' style={{position:'relative'}}>
                         <div onClick={postMessage} className='white-text' style={{position : 'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}>
                             Send
                          </div>   
                     </div>   
              </div>   
        </div>
    )
}

export default Message;