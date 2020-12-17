import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Context } from "../Context";
import Form from "./Form";

const UserSignIn = (props) => {
  const history = useHistory();
  const context = useContext(Context);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState("");

  const change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setName(value);
  };

  const submit = () => {
    const from = history.state || { from: { pathname: "/" } };

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors("Sign-in was unsuccessful");
        } else {
          history.push(from);
        }
      })
      .catch((error) => {
        console.error(error);
        history.push("/error");
      });
  };

  const cancel = () => {
    history.push("/");
  };
  return (
    <div className="bounds">
      <div className="grid-33 centered signin">
        <h1>Sign In</h1>
        <div>
          <Form
            cancel={cancel}
            errors={errors}
            submit={submit}
            elements={() => (
              <>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  value={emailAddress}
                  onChange={change}
                  placeholder="Email Address"
                />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={change}
                  placeholder="Password"
                />
              </>
            )}
          />
        </div>
        <p>&nbsp;</p>
        <p>
          Don't have a user account? <NavLink to="/signup">Click here</NavLink>{" "}
          to sign up!
        </p>
      </div>
    </div>
  );
};

export default UserSignIn;
