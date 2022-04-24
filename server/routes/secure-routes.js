const express = require('express');
const secureRoutes = express.Router();
const cookieParser = require('cookie-parser');
// Helps in db connection.
const dbo = require("../db/conn")

// Converts id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

var cookieExtractor = function(req) {
  
}

// Upload a new project.
secureRoutes.route("/projects/new").post(function (req, response) {
    let db_connect = dbo.getDb();
    let project = {
      name: req.body.name,
      description: req.body.description,
      url: req.body.url,
      tags: req.body.tags,
    };
    db_connect.collection("projects").insertOne(project, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
  }
);

// secureRoutes.route("admin/test").get(function(req,response){
//   var token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   role = token.user.role;


//   response.json({role: role})
// });


module.exports = secureRoutes