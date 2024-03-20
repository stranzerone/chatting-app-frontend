import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const Navigate = useNavigate();

  return (
    <div className="app-container ">
      <h1 className="text-center mt-5 mb-4" style={{ color: "white" }}>
        Socket.io Chat 
      </h1>
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-center  ">
        <div className="form-group d-md-flex align-items-center justify-content-center ">
          <label htmlFor="room">Room:</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setRoom(e.target.value)}
            name="room"
          />
        </div>
        <div className="form-group d-md-flex align-items-center justify-content-start mx-md-4 ">

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="input text-warning  "
            onChange={(e) => setUsername(e.target.value)}
            name="username"
          />
        </div>
        <button className='homeButton btn btn-success btn-block my-1 ' onClick={() => Navigate(`/chat/${room}/${username}`)}>Join Room</button>
      </div>
      <div className="chat-container">
        <p>Let's Connect to the World</p>
      </div>
    </div>
  );
};

export default Home;
