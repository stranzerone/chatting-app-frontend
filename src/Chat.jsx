import React, { useEffect, useState, useRef } from 'react';
import {  useParams } from 'react-router-dom';
import "./Chat.css"

export default function Chat({socket}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
 
  const socketRef = useRef();


  const { room } = useParams();
  const username = useParams().sender
  // Initialize the socket connection only once





useEffect(() => {




  socketRef.current = socket;




  const joinRoom = () => {
    if (room) {
      socket.emit('join_room', { room: room, username: username });
    }
  };

if(room){
  joinRoom();
}

const handleMessage = (newMessage) => {
  // Check if the message already exists in the messages array
  const messageExists = messages.some(message => message.content === newMessage.content);

  // Add the new message only if it doesn't already exist
  if (!messageExists) {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }
};


  socketRef.current.on("receive_message", handleMessage);



  // Listen for the "users_joined" event and call handleUserJoined function


  return () => {
    socketRef.current.off("receive_message", handleMessage);
  };
}, [room]);



  const sendMessage = () => {
    if (message.trim() !== '') {
      socketRef.current.emit('send_message', { content: message, room: room,sender:username});
      setMessages(prevMessages => [...prevMessages, {content:message,room:true}]);
      setMessage('');
    }
  };

  return (
    <div className='mainCoin '>
      

      <div className='mainBox '>
        <div className='recievedCoin   '>
        <p className='text-warning d-flex justify-content-end'>room:{room}</p>

          {messages.map((data, index) => (
            <div key={index}>
            <div  className= {data.room?null:'d-flex'}>
            <div  className= {data.room?'sentMessage':'recievedMessage'}>
              <p>{data.content}</p>

            
            </div>
         
            {data.sender !== username && !data.room && <p className='text-success mx-2 my-1'>{data.sender}</p>}

         
            </div>
           {data.time? <p className='time'>{data.time}</p>:null}
</div>
          ))}
        </div>
    
      </div>
      <div className='messageInput '>
       
        <input
        className='messageIn col-8 mx-2 col-md-7'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
