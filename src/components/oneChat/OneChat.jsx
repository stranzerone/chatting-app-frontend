import React from 'react'
import Users from '../users/Users'
import OneMessage from './OneMessage'

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function OneChat({socket}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div>
    

 <div  className='position-absolute   d-md-none d-flex justify-content-end   '>
      <Button variant="success" onClick={handleShow}>
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
<div className='col-12  col-md-8 '><OneMessage socket={socket} /></div>



    <div className='d-none  d-md-block col-md-4 '><Users socket={socket} /></div>


        
    </div>
    </div>
  )
}





