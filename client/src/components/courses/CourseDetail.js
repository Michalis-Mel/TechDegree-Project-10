import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  //Get the course details from the api when the page loads
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then((response) => {
        const courses = response.data;
        return courses;
      })
      .then((courses) =>
        this.setState({
          courses: [courses],
        })
      )
      .catch((error) => {
        if (error.status === 404) {
          console.log("Unable to get course details");
        }
      });
  }

  //delete button function that deletes the course from the api if the user is the author
  delete = async (e) => {
    e.preventDefault();
    const { context } = this.props;

    const authUser = context.authenticatedUser;

    axios
      .delete(
        `http://localhost:5000/api/courses/${this.props.match.params.id}`,
        {
          method: "DELETE",
          auth: {
            username: `${authUser.emailAddress}`,
            password: `${authUser.password}`,
          },
        }
      )
      .then(() => {
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
        this.props.history.push("/error");
      });
  };

  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { courses } = this.state;

    return (
      <div className="bounds">
        {courses.map((course) => (
          <div key={course.id}>
            <div className="actions--bar">
              <div className="bounds">
                <div className="grid-100">
                  {authUser && authUser.id === course.User.id && (
                    <span>
                      <NavLink
                        className="button"
                        to={`/courses/${this.props.match.params.id}/update`}
                      >
                        Update Course
                      </NavLink>
                      <NavLink
                        key="1"
                        className="button"
                        to="#"
                        onClick={this.delete}
                      >
                        Delete Course
                      </NavLink>
                    </span>
                  )}
                  <NavLink key="2" className="button button-secondary" to="/">
                    Return to List
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                  <p>
                    By: {course.User.firstName} {course.User.lastName}
                  </p>
                </div>
                <div className="course--description">
                  <ReactMarkdown>{course.description}</ReactMarkdown>
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <li>
                          <ReactMarkdown>
                            {course.materialsNeeded}
                          </ReactMarkdown>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
export default CourseDetail;
