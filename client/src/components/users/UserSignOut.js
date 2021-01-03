import React from "react";
import { Redirect } from "react-router-dom";

export default ({ context }) => {
  //The signout function is called so we can log the user off
  context.actions.signOut();

  return <Redirect to="/" />;
};
