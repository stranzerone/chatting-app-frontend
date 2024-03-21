import React, { useEffect, useState } from 'react'
import "./user.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


export default function Users({}) {
const [usersData,setUsersData]  =useState([])
const {sender,room} =useParams()
const navigate = useNavigate()
const ROOOM = useParams().room

const uri = process.env.REACT_APP_BACKEND

const getUsers = async()=>{
try{
  const response = await axios.post(uri,{room:ROOOM,name:"sahil"})
  setUsersData(response.data)
}catch(error){
  console.error(error)
}

 
  }
  


    

useEffect(()=>{


getUsers();

  


},[])





    
  return (
    <div className='usersCoin '>

{usersData.map((data)=>(


  <div key={data.socket} className='usersBox' >

<div className='circle  col-2'><h1 className='my-2'> 
    {data.username.charAt(0)} {/* First letter */}
    {data.username.slice(-1)} {/* Last letter */}
  </h1></div>
<div className='username d-flex  col-6'><h1>{data.username}</h1>  </div>
<div  className='col-4 d-flex gap-4'>  <div className='status  ' style={{backgroundColor:data.status==1?"green":"red"}}  ></div>  <button onClick={()=>navigate(`/chat/${room}/${data.socket}/${sender}/${data.username}`)}>&#9658;</button>
 </div>
</div>
))}



    </div>
  )
}
