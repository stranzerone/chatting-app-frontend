import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../Chat.css"

export default function Chat({socket}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();
  const navigate = useNavigate()
  // Initialize the socket connection only once
  const { socketId, sender, reciever,room } = useParams();

  useEffect(() => {
    // Store the current socket reference
    socketRef.current = socket;

    const handleMessage = (message) => {
      if (message.sender === reciever) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    };

    // Listen for incoming messages
    socketRef.current.on("oneMessage", handleMessage);

    // Clean up event listeners when component unmounts or parameters change
    return () => {
      socketRef.current.off("oneMessage", handleMessage);
    };
  }, [socket, socketId, sender, reciever]); // Re-run effect when any of these dependencies change

  const sendMessage = () => {
    if (message.trim() !== '') {
      socketRef.current.emit('message', { content: message, socketId, sender });
      setMessages(prevMessages => [...prevMessages, {content: message, room: true,sender:reciever}]);
      setMessage('');
    }
  };

  return (
    <div className='mainCoin  bg-dark'>
      <div className='mainBox'>
        <div className='recievedCoin  '>
        <p className='text-warning d-flex justify-content-end'>{reciever}</p>

          {messages.map((data, index) => (
            <div key={index}>


            {data.sender==reciever?
              <div>
                <div className={data.room ? 'sentMessage' : 'recievedMessage'}>
                  <p>{data.content}</p>
                </div>
                {data.time ? <p className='time'>{data.time}</p> : null}
              </div>

              :null
            }


            </div>
          ))}
        </div>
      </div>
      <div className='messageInput'>
        <input

          className='messageIn  col-8 mx-2 col-md-5'
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
        />
        <button onClick={sendMessage}>&#9658;</button> 
        <button className='mx-2'  onClick={()=>navigate(`/chat/${room}/${sender}`)}>Back to Group</button>

      </div>
    </div>
  );
}
