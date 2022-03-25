const ds = require("../datasources/pammicc-api");

function Project(id, name, description) {
  this.id = id;
  this.name = name;
  this.description = description;
}

module.exports = {
  getProjects: async function() {
    try {
      var projects = [];
      const response = await ds.getProjects();
      if (Array.isArray(response)) {
        response.map( project => {
          projects.push(new Project(project._id, project.project_name, project.project_description))
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
      const newProject = {
        "project_name": values.name,
        "project_description": values.description
      }

      await ds.newProject(newProject);
      return null;
    } catch (error) {
      return error;
    }
  },
};


