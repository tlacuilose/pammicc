const ds = require("../datasources/pammicc-api");

class Project {
  constructor (id, name, description, url, tags) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.tags = tags;
  }

  validate() {
    if (this.name === "") {
      throw new Error("Cant upload a project without a name.");
    }
  }
}

var emailFilter = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

class User {
  constructor (id, name, lastName, email, password) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }

  validate() {
    if ((this.name != null && this.name === "") || (this.name != null && this.lastName === "")) {
      throw new Error("Cant have a user without a name or a last name.");
    }
    if (!emailFilter.test(this.email)) {
      throw new Error("Please provide a valid email.")
    }
    if (this.password.length < 8) {
      throw new Error("Cant have a password of less than 8 characters.");
    }
  }
}

export async function getProjects() {
  try {
    let projects = [];
    const response = await ds.getProjects();
    if (Array.isArray(response)) {
      response.map( project => {
        projects.push(
          new Project(
            project._id,
            project.name,
            project.description,
            project.url,
            project.tags
          )
        )
      });
      return {
        result: projects,
        error: null
      };
    }
    return {
      result: null,
      error: new Error("An error occurred getting projects from api-datasource.")
    };
  } catch (e) {
    return {
      result: null,
      error: e
    }
  }
}

export async function addNewProject(values) {
  try {
    const newProject = new Project(
      null,
      values.name,
      values.description,
      values.url,
      values.tags
    );
    newProject.validate();

    await ds.newProject(newProject);
    return null;
  } catch (error) {
    return error;
  }
}

export async function loginUser(values) {
  try {
    const user = new User(
      null,
      null,
      null,
      values.email,
      values.password
    )

    user.validate()

    await ds.login(user)
    return null;
  } catch (error) {
    return error;
  }
}

export async function registerUser(values) {
  try {
    const newUser = new User(
      null,
      values.name,
      values.lastName,
      values.email,
      values.password
    )

    newUser.validate()

    await ds.register(newUser)
    return null;
  } catch (error) {
    return error;
  }
}
