import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const role = localStorage.getItem('role');

  return (
    <div
      className={` ${
        sidebarMenu
          ? 'sidebar-menu'
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ''}`
        } `}
    >
      <nav>
        <ul>

          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/product/landing/all">Product</Link>
          </li>
          <li>
            <Link to="/qna">Q&A</Link>
          </li>
          {role == 0 ? (
            <>
              <li>
                <Link to="/product/upload">Register</Link>
              </li>
              <li>
                <Link to="/product/stock">Management</Link>
              </li>
            </>
          ) : (
            
               <li>
                 {role == 2 ? (
                   <Link to="/admin/product">Admin</Link>
                 ) : (
                   ""
                 )}
               </li>
            )}
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default NavMenu;
