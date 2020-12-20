import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Consumer } from "../../Context";

const UserSignIn = (props) => {
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const change = (event) => {
    let name = event.target.name;
    const value = event.target.value;
    if ((name = emailAddress)) {
      setEmailAddress(value);
    } else if ((name = password)) {
      setPassword(value);
    }
  };

  return (
    <Consumer>
      {({ signIn }) => (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
              <form onSubmit={(e) => signIn(e, emailAddress, password)}>
                <div>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    placeholder="Email Address"
                    onChange={change}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={change}
                  />
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Sign In
                  </button>
                  <button className="button button-secondary">
                    <NavLink to="/">Cancel</NavLink>
                  </button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>
              Don't have a user account?{" "}
              <NavLink to="/sign-up">Click here</NavLink> to sign up!
            </p>
          </div>
        </div>
      )}
    </Consumer>
  );
};

export default UserSignIn;
