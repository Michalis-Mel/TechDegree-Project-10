//Imports
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Courses} />
          <Route path="/courses/:id" component={CourseDetail} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
