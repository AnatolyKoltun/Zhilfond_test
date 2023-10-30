import React from 'react';
import '../nullstyle.css';
import './styles/navbar.scss';
import { Outlet } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <div className="logo">Жилфонд</div>
      <Outlet />
    </>
  );
}

export default NavBar;
