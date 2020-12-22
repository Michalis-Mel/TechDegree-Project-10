import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";
import Data from "./Data";

export const MyContext = React.createContext();

export const Provider = (props) => {
  const history = useHistory();

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [user, setUser] = useState({});
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const data = new Data();

  const handleSignIn = (e, emailAddress, password) => {
    if (e) {
      e.preventDefault();
    }
    //      Axios fetch request
    axios
      .get("http://localhost:5000/api/users", {
        auth: {
          username: emailAddress,
          password: password,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          let user = res.data;

          setUser(user);
          setEmailAddress(user.emailAddress);
          setPassword(user.password);
          setIsLoggedIn(true);
          Cookies.set("authenticatedUser", JSON.stringify(user));
          window.localStorage.setItem("emailAddress", emailAddress);
          window.localStorage.setItem("password", password);

          history.push("/");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          history.push("/notfound");
          console.log("Error Parsing and Fetching Data", err);
        } else if (err.response.status === 500) {
          history.push("/error");
          console.log("Error Parsing and Fetching Data", err);
        }
      });
  };
  const handleSignOut = () => {
    window.localStorage.clear();

    setUser({ user });
    setEmailAddress("user.emailAddress");
    setPassword("user.password");
    setIsLoggedIn(false);
    Cookies.remove("authenticatedUser");

    history.push("/");
  };
  return (
    <MyContext.Provider
      value={{
        authenticatedUser,
        user: user,
        emailAddress: emailAddress,
        password: password,
        isLoggedIn: isLoggedIn,
        signIn: handleSignIn,
        signOut: handleSignOut,
        data: data,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export const Consumer = MyContext.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <MyContext.Consumer>
        {(context) => <Component {...props} context={context} />}
      </MyContext.Consumer>
    );
  };
}
