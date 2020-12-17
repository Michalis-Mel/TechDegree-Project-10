import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Consumer } from "../Context";
import axios from "axios";

const UserSignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case firstName:
        setFirstName(value);
        break;
      case lastName:
        setLastName(value);
        break;
      case emailAddress:
        setEmailAddress(value);
        break;
      case password:
        setPassword(value);
        break;
      case confirmPassword:
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSignUp = (event, signIn) => {
    if (event) {
      event.preventDefault();
    }

    if (password === "") {
      console.log("Please enter a password");
    } else if (password !== confirmPassword) {
      console.log("passwords do not match");
    } else {
      axios({
        method: "POST",
        url: "http://localhost:5000/api/users",
        data: {
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
          password: password,
          confirmPassword: confirmPassword,
        },
      })
        .then((res) => {
          if (res.status === 201) {
            signIn(null, emailAddress, password);
          }
        })
        .catch((err) => console.log("error fetching data", err));
    }
  };

  return (
    <Consumer>
      {({ signIn }) => (
        <div className="bounds">
          <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
              <form onSubmit={(event) => handleSignUp(event, signIn)}>
                <div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className=""
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className=""
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="emailAddress"
                    name="emailAddress"
                    type="text"
                    className=""
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className=""
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className=""
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </div>
                <div className="grid-100 pad-bottom">
                  <button className="button" type="submit">
                    Sign Up
                  </button>
                  <button className="button button-secondary">
                    <NavLink to="/">Cancel</NavLink>
                  </button>
                </div>
              </form>
            </div>
            <p>&nbsp;</p>
            <p>
              Already have a user account?{" "}
              <NavLink to="/sign-in">Click here</NavLink> to sign in!
            </p>
          </div>
        </div>
      )}
    </Consumer>
  );
};

export default UserSignUp;
