import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { MyContext } from "../Context";

const Header = () => {
  const context = useContext(MyContext);
  const authUser = context.authenticatedUser;
  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          {authUser ? (
            <>
              <span>
                Welcome, {authUser.firstName} {authUser.lastName}!
              </span>
              <NavLink to="/sign-out">Sign Out</NavLink>
            </>
          ) : (
            <>
              <NavLink className="signup" to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink className="signin" to="/sign-in">
                Sign In
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
