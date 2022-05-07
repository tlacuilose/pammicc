const ds = require("../datasources/pammicc-api");

class Project {
  constructor (id, name, description, url, tags, userid) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.url = url;
    this.tags = tags;
    this.userid = userid;
  }

  validate() {
    if (this.name === "") {
      throw new Error("Cant upload a project without a name.");
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
            project.name || "" ,
            project.description || "",
            project.url || "",
            project.tags || "",
            project.userid
          )
        )
        return project
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

export async function getProject(id) {
  try {
    const response = await ds.getProject(id);
    const project = new Project(
      response._id,
      response.name || "",
      response.description || "",
      response.url || "",
      response.tags || "",
      response.userid
    );
    return project;
  } catch (e) {
    throw e;
  }
}

export async function addNewProject(values) {
  try {
    const newProject = new Project(
      null,
      values.name,
      values.description,
      values.url,
      values.tags,
      null
    );
    newProject.validate();

    await ds.newProject(newProject);
    return null;
  } catch (error) {
    return error;
  }
}

export async function updateProject(values, id) {
  try {
    const oldProject = new Project(
      id,
      values.name,
      values.description,
      values.url,
      values.tags,
      id
    );
    oldProject.validate();

    await ds.updateProject(oldProject, id);
    return null;
  } catch (error) {
    return error;
  }
}

export async function deleteProject(id) {
  try {
    await ds.deleteProject(id);
  } catch (error) {
    throw error;
  }
}

