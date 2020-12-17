import React, { useState } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

export const Context = React.createContext();

export const Provider = (props) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const data = new Data();

  const value = {
    authenticatedUser,
    data: data,
    actions: {
      signIn: signIn,
      signOut: signOut,
    },
  };
  return <Context.Provider value={value}>{props.children}</Context.Provider>;

  const signIn = async (username, password) => {
    const user = await data.getUser(username, password);
    if (user !== null) {
      setAuthenticatedUser(user);
      const cookieOptions = {
        expires: 1, // 1 day
      };
      Cookies.set("authenticatedUser", JSON.stringify(user), { cookieOptions });
    }
    return user;
  };

  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove("authenticatedUser");
  };
};

export const Consumer = Context.Consumer;

export function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}

export default { withContext, Context };
