import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";

class Header extends React.PureComponent {
  render() {
    const { context } = this.props;

    let authUser = null;
    const authU = context.authenticatedUser;
    if (authU) {
      authUser = authU[0];
    }

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
          <hr />
        </div>
      </div>
    );
  }
}

export default Header;
