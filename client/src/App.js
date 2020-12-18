//Imports
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import withContext from "./Context";

//Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import NotFound from "./components/NotFound";

const UserSignUpWithContext = withContext(UserSignUp);

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Courses} />
        <Route path="/courses/:id" component={CourseDetail} />
        <Route path="/sign-in" component={UserSignIn} />
        <Route path="/sign-up" component={UserSignUpWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
