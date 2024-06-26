import React from 'react'
import PropTypes from 'prop-types'  //impt + Enter
import { Link, useNavigate } from 'react-router-dom';
import { isTokenExpired } from './Functions';

export default function Navbar(prop) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const jwtToken = localStorage.getItem('jwtToken'); // Get JWT token from localStorage
    console.log(jwtToken);
    if (jwtToken && isTokenExpired(jwtToken)!==true) {
      navigate('/profile'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    
    <>
    <nav className={`navbar navbar-expand-lg navbar-dark bg-dark`}>
  <div className="container-fluid">
   <Link className="navbar-brand" to="/">{prop.title}</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item dropdown" >
         <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/login">Login</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li> <button className="dropdown-item" onClick={handleProfileClick}>
            Show Profile
          </button></li>
          </ul>
        </li>
      
      </ul>
      
    </div>
  </div>
</nav>
  
    </>

  )
}

