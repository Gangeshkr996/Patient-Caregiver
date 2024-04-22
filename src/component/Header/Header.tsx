import React, { useState } from 'react';
import './Header.css'; 
import logo from './../../assets/images/App_logo.png'

const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header className="adli-container adli-navbar">
      <div className="logo"><img style={{height:'50px'}} src={logo}/></div>
    </header>
  );
};

export default Header;
