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

module.exports = {
  getProjects: async function() {
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
  },
  addNewProject: async function(values) {
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
  },
};


