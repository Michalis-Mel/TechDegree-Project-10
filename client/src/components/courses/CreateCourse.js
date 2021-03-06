import React from "react";
import { NavLink } from "react-router-dom";

class CreateCourse extends React.Component {
  state = {
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    errors: [],
  };

  //The change method changes the state of the name with each input
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value,
      };
    });
  };

  //create course button's functionality
  submit = async (e) => {
    e.preventDefault();
    const { context } = this.props;
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const emailAddress = context.authenticatedUser.emailAddress;
    const password = context.authenticatedUser.password;
    const userId = context.authenticatedUser.id;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    context.data
      .createCourse(course, emailAddress, password)
      .then((errors) => {
        if (errors.length > 0) {
          this.setState({ errors });
        } else {
          this.props.history.push("/");
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          this.props.history.push("/forbidden");
        } else {
          console.log("Error fetching data", error);
          this.props.history.push("/error");
        }
      });
  };

  render() {
    const { title, description, estimatedTime, materialsNeeded } = this.state;

    const { context } = this.props;

    const authUser = context.authenticatedUser;

    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          {this.state.errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {this.state.errors.map((error, i) => (
                    <li key={i}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <form onSubmit={this.submit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course (required)</h4>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={this.change}
                    value={title}
                    className="input-title course--title--input"
                    placeholder="Course title..."
                  />
                </div>
                <p>
                  By {authUser.firstName} {authUser.lastName}
                </p>
              </div>
              <div className="course--description">
                <h4 className="course--label">Description (required)</h4>
                <div>
                  <textarea
                    id="description"
                    name="description"
                    onChange={this.change}
                    value={description}
                    className=""
                    placeholder="Course description..."
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="text"
                        onChange={this.change}
                        value={estimatedTime}
                        className="course--time--input"
                        placeholder="Hours"
                      />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea
                        id="materialsNeeded"
                        name="materialsNeeded"
                        onChange={this.change}
                        value={materialsNeeded}
                        className=""
                        placeholder="List materials..."
                      ></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">
                Create Course
              </button>
              <NavLink className="button button-secondary" to="/">
                Cancel
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
