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
projectRoutes.route("/projects").get(function (req, res) {
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
projectRoutes.route("/projects/:id").get(function (req, res) {
  console.log("Trying get");
  let db_connect = dbo.getDb();
  let id_query = { _id: ObjectId(req.params.id)};
  db_connect
    .collection("projects")
    .findOne(id_query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = projectRoutes;
