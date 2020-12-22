import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { MyContext } from "../../Context";

const UserSignOut = () => {
  const context = useContext(MyContext);
  context.signOut();

  return <Redirect to="/" />;
};

export default UserSignOut;
