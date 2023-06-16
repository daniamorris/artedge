import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/">home</NavLink></li>
        <li><NavLink to="/art">art</NavLink></li>
        <li><NavLink to="/support">support</NavLink></li>
        <li><NavLink to="/upload">upload</NavLink></li>
        <li><NavLink to="/profile">profile</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navigation;