import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Form from "./Form";
import { MyContext } from "../Context";

const UserSignUp = () => {
  const history = useHistory();
  const context = useContext(MyContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState([]);

  const change = ({ target: { name, value } }) => {
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "emailAddress":
        setEmailAddress(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const Submit = (e) => {
    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data.__proto__
      .createUser(user)
      .then((errors) => {
        if (errors) {
          setError({ errors });
        } else {
          context.signIn(e, emailAddress, password);
        }
      })
      .catch((err) => {
        console.log(err);
        history.push("/error");
      });
  };

  const cancel = () => {
    history.push("/");
  };

  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign Up</h1>
        <Form
          cancel={cancel}
          error={error}
          submit={Submit}
          elements={() => (
            <React.Fragment>
              <input
                id="firstName"
                name="firstName"
                type="text"
                onChange={change}
                placeholder="First Name"
              />
              <input
                id="lastName"
                name="lastName"
                type="text"
                onChange={change}
                placeholder="Last Name"
              />
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                onChange={change}
                placeholder="Email Address"
              />

              <input
                id="password"
                name="password"
                type="password"
                onChange={change}
                placeholder="Password"
              />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={change}
                placeholder="Confirm Password"
              />
            </React.Fragment>
          )}
        />
        <p>
          Already have a user account?{" "}
          <NavLink to="/sign-in">Click here</NavLink> to sign in!
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
