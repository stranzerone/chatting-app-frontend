import React from 'react';
import Home from './Home'
import { Routes, Route} from 'react-router-dom';
import OneChat from './components/oneChat/OneChat';
import { io } from 'socket.io-client';
import { useRef } from 'react';
import GroupChat from './GroupChat';
function App() {

    const uri = process.env.REACT_APP_BACKEND

    const socketRef = useRef();
    if (!socketRef.current) {
        socketRef.current = io.connect(uri);
    }
  
    const socket = socketRef.current;

 return (
 <Routes>
  <Route  path='/' element={<Home  socket={socket}/>} />
  <Route  path='/chat/:room/:sender'  element={<GroupChat  socket={socket} />}  />
  <Route  path='/chat/:room/:socketId/:sender/:reciever'  element={<OneChat  socket={socket}  />}  />

 </Routes>

 );
}

export default App;
