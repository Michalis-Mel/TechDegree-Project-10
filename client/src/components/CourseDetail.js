import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();

  //State
  const [oneCourse, setOneCourse] = useState([]);

  useEffect(() => {
    // Update the courses state when the the page renders
    //Fetch the data
    const getOneCourse = () => {
      axios
        .get(`http://localhost:5000/api/courses/${id}`)
        .then((response) => {
          const course = response.data;
          return course;
        })
        .then((course) => {
          setOneCourse(course);
        })
        .catch((error) => {
          if (error.status === 404) {
            console.log("Unable to get course details");
          }
        });
    };
    getOneCourse();
  }, []);

  if (oneCourse) {
    return (
      <div key={oneCourse.id}>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <NavLink className="button" to="update-course.html">
                  Update Course
                </NavLink>
                <NavLink className="button" to="/courses/delete">
                  Delete Course
                </NavLink>
              </span>
              <NavLink className="button button-secondary" to="/">
                Return to List
              </NavLink>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{oneCourse.title}</h3>
              <p>
                By {oneCourse.User.firstName} {oneCourse.User.lastName}
              </p>
            </div>
            <div className="course--description">{oneCourse.description}</div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{oneCourse.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{oneCourse.materialsNeeded}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
};

export default CourseDetail;
