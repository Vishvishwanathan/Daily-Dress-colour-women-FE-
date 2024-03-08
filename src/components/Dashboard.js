import React from 'react'
import { Button,Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import useLogout from '../common/useLogout';
import AxiosService from '../common/ApiService'
import { toast } from "react-toastify";


function Header() {
    let navigate = useNavigate()
    let logout = useLogout()
    let id = sessionStorage.getItem('id');
    const [userData, setUserData] = useState(null);
    const reversedColors = userData && userData.recentColors ? [...userData.recentColors].reverse() : [];

  const fetchData = async () => {
    try {
      const res = await AxiosService.get(`/login/${id}`);

      setUserData(res.data.user);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const suggestcolor = async () => {
    try {
      const res = await AxiosService.put(`/suggestcolor/${id}`);
      console.log("suggest:",res)

      // useEffect(() => {
      //   fetchData();
      // }, []);
      
    } catch (error) {
      console.error(error);
    }
  };
        let add = async()=>{
            try {
                navigate('/userdetail')
                
            } catch (error) {
                toast.error(error.response.data.message)
            }
}
  return <>
  <div className='dash1'>
  <Navbar className="nav" expand="md">
      <Container className='flex'>
      {userData && (
        <Navbar.Brand className="text-white"><span className='text-center'>{userData.firstName}</span>&nbsp;&nbsp;&nbsp;Dashboard </Navbar.Brand>
      )}
        <Navbar.Toggle aria-controls="navbarCollapse" />
        <Navbar.Collapse id="navbarCollapse">
          <Nav className="ms-auto">
          <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>navigate('/changepassword')}>change Password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>navigate('/deleteaccount')}>Delete Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={()=>navigate('/aboutapp')}>About App</NavDropdown.Item>
            </NavDropdown>
            <Button className="nav-btn" onClick={() => add()}>Add Details</Button>
            <Button className="nav-btn" onClick={() => logout()}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className="container c1">
      {userData && (
        <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)', backdropFilter: 'blur(10px)' }}>
          <thead>
            <tr className='tbn'>
              <th scope="col">My Collections</th>
              <th scope="col">Colors</th>
            </tr>
          </thead>
          <tbody>
            <tr className='tbn'>
              <th scope="row">Dress</th>
              <td>
                {userData.dresscolor.length === 0 ? (
                  "Add dress color by clicking Add details"
                ) : (
                  userData.dresscolor.map((color, index) => (
                    <span key={index}>
                      {color}
                      {index !== userData.dresscolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                    </span>
                  ))
                )}
              </td>
            </tr>
            <tr className='tbn'>
              <th scope="row">Watch</th>
              <td>
                {userData.watchcolor.length === 0 ? (
                  "Add watch color by clicking Add details"
                ) : (
                  userData.watchcolor.map((color, index) => (
                    <span key={index}>
                      {color}
                      {index !== userData.watchcolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                    </span>
                  ))
                )}
              </td>
            </tr>
            <tr className='tbn'>
              <th scope="row">Shoe</th>
              <td>
                {userData.shoecolor.length === 0 ? (
                 "Add shoe color by clicking Add details"
                ) : (
                  userData.shoecolor.map((color, index) => (
                    <span key={index}>
                      {color}
                      {index !== userData.shoecolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                    </span>
                  ))
                )}
              </td>
            </tr>
            <tr className='tbn'>
              <th scope="row">Bag</th>
              <td>
                {userData.bagcolor.length === 0 ? (
                 "Add bag color by clicking Add details"
                ) : (
                  userData.bagcolor.map((color, index) => (
                    <span key={index}>
                      {color}
                      {index !== userData.bagcolor.length - 1 && <span style={{ borderRight: '1px solid #000', margin: '0 5px' }}></span>}
                    </span>
                  ))
                )}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>

    <div className="container c1">
      {userData && (
        <table className="table" style={{ backgroundColor: 'rgba(208, 26, 26, 0.105)',backdropFilter: 'blur(10px)'}}>
          <thead>
            <tr className='tbn'>
              <th colSpan={reversedColors.length + 1}>Last 1 Week Color Suggestions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='tbn'>
              <th scope="row">Day</th>
              {reversedColors.map((_, index) => (
                <td key={index}>{index + 1}</td>
              ))}
            </tr>
            <tr className='tbn'>
              <th scope="row">Color</th>
              {reversedColors.map((color, index) => (
                <td style={{ color:`${color}`}} key={index}>{color}</td>
              ))}
            </tr>
          </tbody>
        </table>
      )}
    </div>


    <div className="form-box1">
  <div className="container">

  <Form className= "input-group d-flex flex-column" >
    <div className= "d-flex flex-column no-wrap text-center pt-3">
  <div>
  {userData && (
        <>
          <span style={{ color: 'white'}} >Today's dress color suggestion is</span>
          &nbsp; &nbsp; &nbsp;
          <span className='color' id="suggest" style={{ backgroundColor: `${userData.value}`}} ></span>&nbsp; &nbsp;
          <span style={{ color: `${userData.value}`}}>{userData.value}</span>
        </>
      )}
      </div>
      <div>
    <Button type="submit" className="suggest-btn" onClick={()=>suggestcolor()}>Suggest Color</Button>
    </div>
    </div>
  </Form>
  </div>
  </div>
 </div>
  </>
}

export default Header