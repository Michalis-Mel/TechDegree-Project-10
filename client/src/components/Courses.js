import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Courses = () => {
  //State
  const [courses, setCourses] = useState([]);

  //Fetch the data
  const getCourses = () => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => {
        const courses = response.data;
        return courses;
      })
      .then((courses) => {
        setCourses(courses);
      })
      .catch((error) =>
        console.log("There was an error loading the page: " + error)
      );
  };

  useEffect(() => {
    // Update the courses state when the the page renders
    getCourses();
  }, []);
  if (courses.length > 0) {
    return (
      <div>
        {courses.map((course) => (
          <div className="bounds" key={course.id}>
            <div className="grid-33">
              <NavLink
                className="course--module course--link"
                to={`/courses/${course.id}`}
              >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </NavLink>
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
};

export default Courses;
