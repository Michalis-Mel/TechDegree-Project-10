import config from "./config";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      let encodedCredentials = null;
      //Checks to see if the credentials passed are the email and password
      if (credentials.emailAddress && credentials.password) {
        encodedCredentials = btoa(
          `${credentials.emailAddress}:${credentials.password}`
        );
      } else {
        encodedCredentials = credentials;
      }
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }

  //Function that sends the email and password to the api and gets back a user or an error
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  //Function that sends the user to the api and gets back a response that says if the user was added to the api or not
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  //Function that sends the new course to the api and gets back a response that says if the course was added to the api or not
  async createCourse(course, emailAddress, password) {
    const response = await this.api(`/courses`, "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Retrieves a specific course
  async getCourse(id) {
    const course = await this.api(`/courses/${id}`);
    if (course.status === 200) {
      return course.json().then((data) => data);
    } else if (course.status === 401) {
      return null;
    } else {
      // Used for sending down a 500 error
      return course.status;
    }
  }

  // Updates a specific course
  async updateCourse(course, emailAddress, password) {
    const response = await this.api(
      `/courses/${course.id}`,
      "PUT",
      course,
      true,
      { emailAddress, password }
    );
    if (response.status === 204) {
      return [];
    } else if (
      response.status === 400 ||
      response.status === 401 ||
      response.status === 403
    ) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
