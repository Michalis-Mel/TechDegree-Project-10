import React from "react";
import { NavLink } from "react-router-dom";

const ErrorHandler = () => {
  return (
    <div className="bounds">
      <h1>Error</h1>
      <p>Sorry, an error has occurred.</p>
      <NavLink className="button button-secondary" to="/">
        Return to Course List
      </NavLink>
    </div>
  );
};

export default ErrorHandler;
