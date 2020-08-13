import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";


const NavMenu = ({ menuWhiteClass, sidebarMenu, user }) => {
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
        } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              home
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                  <i className="fa fa-angle-down" />
                )}
            </Link>
            <ul className="mega-menu mega-menu-padding">
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      1
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion"}>
                      hf
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion-two"}>
                      hf2
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion-three"}>
                      hf3
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion-four"}>
                      hf4
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-fashion-five"}>
                      hf5
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li className="mega-menu-title">
                    <Link to={process.env.PUBLIC_URL + "/"}>
                      hg2
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-five"}>
                      hf2
                    </Link>
                  </li>
                  <li>
                    <Link to={process.env.PUBLIC_URL + "/home-furniture-six"}>
                      hf6
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
              Fblog
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                  <i className="fa fa-angle-down" />
                )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-standard"}>
                  bs
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-no-sidebar"}>
                  bns
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-right-sidebar"}>
                  brs
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/blog-details-standard"}>
                  blog-standard
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              contact_us
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object
};

export default NavMenu;
