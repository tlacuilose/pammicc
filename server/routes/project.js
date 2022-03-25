const express = require("express");

// projectRoutes is an instance of the express router.
// We define routes here.
// The router is added as a middleware and controls requests in /project.
const projectRoutes = express.Router();

// Helps in db connection.
const dbo = require("../db/conn")

// Converts id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

// Get a list of all projects
projectRoutes.route("/project/all").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("projects")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Get a single project by id
projectRoutes.route("/project/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let id_query = { _id: ObjectId(req.params.id)};
  db_connect
    .collection("projects")
    .findOne(id_query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Upload a new project.
projectRoutes.route("/project/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let project = {
    project_name: req.body.project_name,
    project_description: req.body.project_description,
  };
  db_connect.collection("projects").insertOne(project, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// Update a project by id.
/* TODO: Add update and delete queries.
projectRoutes.route("record/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let id_query = { _id: ObjectId( req.params.id )};
  let new_values = {
    $set: {
      project_name: req.body.project_name,
      project_description: req.body.project_description,
    },
  };
  db_connect
    .collection("projects")
    .updateOne(id_query, new_values, function (err, res) {
      if (err) throw err;
      console.log("1 document updated")
      respones.json(res);
    });
});

// Delete a project
projectRoutes.route("project/:id").delete(function (req, response) {
  let db_connect = dbo.getDb();
  let id_query = { _id: ObjectId( req.params.id )};
  db_connect.collection("projects").deleteOne(id_query, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});
*/

module.exports = projectRoutes;
