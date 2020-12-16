import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <NavLink to="/sign-up" className="signup">
            Sign Up
          </NavLink>
          <NavLink to="/sign-in" className="signin">
            Sign In
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Header;
