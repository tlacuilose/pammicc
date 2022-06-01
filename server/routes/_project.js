const express = require("express");
const projectController = require('../controllers/projectController')
const secureRoute = require('./_secure-routes');  

// projectRoutes is an instance of the express router.
// We define routes here.
// The router is added as a middleware and controls requests in /project.
const projectRoutes = express.Router();

// Get a list of all projects
projectRoutes.route("/projects").get(projectController.getProjects);

// Get a single project by id
projectRoutes.route("/projects/:id").get(projectController.getById);

projectRoutes.route("/projects/new").post(secureRoute, projectController.newProject);

projectRoutes.route("/projects/:id").post(secureRoute, projectController.updateProject);

projectRoutes.route("/projects/:id").post(secureRoute, projectController.deleteProject);

module.exports = projectRoutes;
