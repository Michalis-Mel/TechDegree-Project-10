import React, { useState, useContext } from "react";
import { Consumer, MyContext } from "../../Context";
import { NavLink } from "react-router-dom";

const CreateCourse = () => {
  const context = useContext(MyContext);
  console.log(context);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [errors, setErrors] = useState([]);
  const [data, setData] = useState({});

  const change = ({ target: { name, value } }) => {
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "estimatedTime":
        setEstimatedTime(value);
        break;
      case "materialsNeeded":
        setMaterialsNeeded(value);
        break;
      default:
        break;
    }
  };

  //create course button's functionality
  const submit = async (e) => {
    e.preventDefault();
    const authUser = context.authenticatedUser;
    const authUserId = authUser.id;
    const emailAddress = authUser.emailAddress;
    const password = authUser.password;

    setData({
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      userId: authUserId,
    });

    //POST request
    const res = await context.data.__proto__.api(
      "/courses",
      "POST",
      data,
      true,
      {
        emailAddress,
        password,
      }
    );
    if (res.status === 200 || res.status === 201) {
      window.location.href = "/";
    } else if (res.status === 400) {
      setErrors({
        errors: ["Please check that all field inputs are correct"],
      });
      return;
    } else if (res.status === 401 || res.status === 403) {
      window.location.href = "/forbidden";
    } else {
      window.location.href = "/not-found";
    }
  };
  return (
    <div className="bounds course--detail">
      <h1>Create Course</h1>
      <div>
        {errors.length ? (
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
        <form onSubmit={submit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  onChange={change}
                  value={title}
                  className="input-title course--title--input"
                  placeholder="Course title..."
                />
              </div>
              <p>{/* By {authUser.firstName} {authUser.lastName} */}</p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  onChange={change}
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
                      onChange={change}
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
                      onChange={change}
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
};

export default CreateCourse;
