import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Courses extends React.Component {
  state = {
    courses: [],
  };

  //Get the courses from the api and save them to the courses state
  getCourses = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        const courses = response.data;
        return courses;
      })
      .then((courses) =>
        this.setState({
          courses: courses,
        })
      )
      .catch((error) =>
        console.log("There was an error loading the page: " + error)
      );
  };

  //call the getCourses function when the page loads
  componentDidMount() {
    this.getCourses();
  }

  render() {
    const { courses } = this.state;
    if (courses.length > 0) {
      return (
        <div id="root">
          {courses.map((course) => (
            <div className="bounds" key={course.id}>
              <div className="grid-33">
                <a
                  className="course--module course--link"
                  href={`/courses/${course.id}`}
                >
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </a>
              </div>
            </div>
          ))}
          <div className="grid-33">
            <NavLink
              className="course--module course--add--module"
              to="/courses/create"
            >
              <h3 className="course--add--title">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="0 0 13 13"
                  className="add"
                >
                  <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                </svg>
                New Course
              </h3>
            </NavLink>
          </div>
        </div>
      );
    } else {
      return "Loading...";
    }
  }
}
export default Courses;
