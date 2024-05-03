import React, { useState, useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Card1() {
  const [formData, setFormData] = useState({
    user:'',
    email: '',
    password: ''
  })
  const navigate = useNavigate();
   const send = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch('http://127.0.0.1:5000/newUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if (response.status===200) {
            setFormData({
                user:'',
                email: '',
                password: ''
               })
          navigate('/profile');
          return response.json();
        } else {
          throw new Error('Email already exist or password less than 8 character ');
        }
      })
      .then(data => {
        console.log('Response from backend:', data);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error: ' + error.message);
      });
  };
  
  
  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    if (name !== undefined && name !== '') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: newValue
      }));
    }
    
  };
  

  
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div className="card text my-5" style={{  backgroundColor: 'white', color: 'white' }}>
      <div className="card-body">
        <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', color: 'black' }}>Login</h5>
        <p className="card-text">
        <form>
        <div className="form-group">
          <label htmlFor="exampleInputName">Name</label>
          <input type="user" className="form-control" id="exampleInputPassword1" name="user" onChange={handleInputChange} placeholder="Enter Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" onChange={handleInputChange} aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleInputChange} placeholder="Password" />
        </div>
       
        <button type="submit" className="btn btn-primary mx-2 my-2" onClick={send}>Submit</button>
      </form>  
        </p>
      </div>
    </div>
  </div>
   <span class="placeholder col-12 bg-light"></span>
   <span class="placeholder col-12"></span>
  <span class="placeholder col-12 bg-primary"></span>
  <span class="placeholder col-12 bg-secondary"></span>
  <span class="placeholder col-12 bg-success"></span>
  <span class="placeholder col-12 bg-danger"></span>
  <span class="placeholder col-12 bg-warning"></span>
  <span class="placeholder col-12 bg-info"></span>
  <span class="placeholder col-12 bg-dark"></span>
 
  </>
  
  )
}
