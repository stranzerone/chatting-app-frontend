import React from 'react'
import Users from './components/users/Users';
import Chat from './Chat';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function GroupChat({socket}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
    

 <div  className='position-absolute   d-md-none d-flex justify-content-end   '>
      <Button variant="success btn-sm"  style={{width:"3rem",height:"2rem"}}  onClick={handleShow}>
        users
      </Button>

      <Offcanvas className="bg-dark" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='text-warning'>users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <div className='  d-md-block col-md-4 '><Users socket={socket} /></div>

        </Offcanvas.Body>
      </Offcanvas>
    </div>
    <div className='d-flex'>
<div className='col-12  col-md-8 '><Chat socket={socket} /></div>



    <div className='d-none  d-md-block col-md-4 '><Users socket={socket} /></div>


        
    </div>
    </div>
  )
}





