import React from "react";
import { NavLink } from "react-router-dom";

class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav>
                {authUser ? (
                  <>
                    <span>
                      Welcome, {authUser.firstName} {authUser.lastName}!
                    </span>
                    <NavLink to="/signout">Sign Out</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="signup" to="/signup">
                      Sign Up
                    </NavLink>
                    <NavLink className="signin" to="/signin">
                      Sign In
                    </NavLink>
                  </>
                )}
              </nav>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default Header;
