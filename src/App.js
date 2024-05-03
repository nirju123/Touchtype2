import './App.css';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Card1 from './components/Card1';
import Layout from './components/Layout';
import Form from './components/Form';
import Profile from './components/Profile';
import Faq from './components/Faq';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DataProvider } from '/home/niraj/development/react/my-app/src/components/DataContext.js';


function App() {
  return (
    <DataProvider>
 
        <Routes>
          <Route
            path="/"
            element={<Layout ><div className='container'><Form title="Enter Text Here"  /></div></Layout>}
          />
          <Route path="/about" element={<Layout ><Faq/></Layout>} />
          <Route path="/login" element={<Layout ><Card/></Layout>} />
          <Route path="/newUser" element={<Layout ><Card1/></Layout>} />
          <Route path="/profile" element={<Layout ><Profile/></Layout>} />
        </Routes>

    </DataProvider>
  );
}

export default App;



  
