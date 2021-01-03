//imports
import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

//component imports
import CourseDetail from "./components/courses/CourseDetail";
import Courses from "./components/courses/Courses";
import CreateCourse from "./components/courses/CreateCourse";
import ErrorHandler from "./components/Error";
import Forbidden from "./components/Forbidden";
import Header from "./components/Header";
import NotFound from "./components/NotFound";
import UpdateCourse from "./components/courses/UpdateCourse";
import UserSignIn from "./components/users/UserSignIn";
import UserSignOut from "./components/users/UserSignOut";
import UserSignUp from "./components/users/UserSignUp";

//importing Context.js file, then using the components 'WithContext'
import withContext from "./Context";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const HeaderWithContext = withContext(Header);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);

class App extends React.Component {
  render() {
    //setting up the routes
    return (
      <div>
        <HeaderWithContext />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <PrivateRoute
            path="/courses/create"
            component={CreateCourseWithContext}
          />
          <PrivateRoute
            path="/courses/:id/update"
            component={UpdateCourseWithContext}
          />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
          <Route path="/signup" component={UserSignUpWithContext} />
          <Route path="/signin" component={UserSignInWithContext} />
          <Route path="/signout" component={UserSignOutWithContext} />
          <Route path="/error" component={ErrorHandler} />
          <Route path="/forbidden" component={Forbidden} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
