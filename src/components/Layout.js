import React from 'react';
import Navbar from '/home/niraj/development/react/my-app/src/components/Navbar.js';

const Layout = ({ children}) => {
  return (
    <>
      <Navbar title="TouchType"/>
      {children}
    </>
  );
};

export default Layout;
