const express = require('express');
const secureRoutes = express.Router();
const projectController = require('../controllers/projectController')
const secureRoute = require('./parse-jwt');  


/* SECURE ROUTES use utility parse-jwt function */

// Upload a new project.
secureRoutes.route("/projects/new").post(secureRoute,projectController.newProject);

// Update a project by id.
secureRoutes.route("/projects/:id").put(secureRoute, projectController.updateProject);

// Delete a project
secureRoutes.route("/projects/:id").delete(secureRoute, projectController.deleteProject);


module.exports = secureRoutes
