import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

export const MyContext = React.createContext();

export const Consumer = MyContext.Consumer;

const Provider = (props) => {
  const history = useHistory();

  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [user, setUser] = useState({});
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

          history.push("/courses");
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

    history.push("/courses");
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
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default Provider;
