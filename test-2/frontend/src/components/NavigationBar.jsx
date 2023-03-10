import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Popover, OverlayTrigger } from 'react-bootstrap';
import '../styles/NavigationBar.css';
import img from '../images/navbar.png';
// import { BACKEND_URL } from '../conf/config';

export function NavigationBar() {

  const [data, setData] = useState(null);

  useEffect(() => {
    // En la linea siguiente se debería parametrizar la url (ej: var de entorno)
    fetch('http://localhost:8000/data/')
      .then(res => res.json())
      .then(data => setData(data.data));
  })

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Header as='h3'>HOO WEE, hello curious!</Popover.Header>
      <Popover.Body>
        Enter to my <strong>Curriculum Vitae</strong>:
        <br />
        <a href='https://www.rodrigoaguirre.com/'
          target='_blank'
          rel='noopener noreferrer'>
          www.rodrigoaguirre.com
        </a>                    
      </Popover.Body>
    </Popover>
  );

  return (
    <Container fluid>
      <Row>
        <Col sm={9} md={9} lg={9} xl={9}>
          <Navbar bg='dark' variant='dark' fixed='top' className='navbar'>
            <Container>
              <Navbar.Brand className='navbar-title'>
                Rick and Morty
              </Navbar.Brand>
            </Container>
            <Container>
              <p style={{ color: 'white' }}>{data}</p>
            </Container>   
          </Navbar>
        </Col>
        <Col sm={3} md={3} lg={3} xl={3}>
          <OverlayTrigger trigger='click' rootClose placement='bottom' overlay={popover}>
            <img
              alt=''
              src={img}
              className='img-fluid roundedCircle mx-auto d-block navbar-img'
              role='button'
            />
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  )
}

