//Imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
          <Route path="/sign-in" component={UserSignIn} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
