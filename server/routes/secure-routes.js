const express = require('express');
const secureRoutes = express.Router();
const cookieParser = require('cookie-parser');
// Helps in db connection.
const dbo = require("../db/conn")

// Converts id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

// Upload a new project.
secureRoutes.route("/projects/new").post(function (req, response) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    jsonPayload = parseJwt(token);

    // Check that the user is project_uploader.
    role = jsonPayload.user.role
    if(role!="project_uploader") {
      response.status(403).send({ message: "Response has been declined" });
    }else{
      let db_connect = dbo.getDb();
      let project = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url,
        tags: req.body.tags,
        userid: req.body.userid,
      };
      db_connect.collection("projects").insertOne(project, function (err, res) {
        if (err) throw err;
        response.status(200).send({ message: "Response has been approved" });
      });
    }
  }
);

// Update a project by id.
secureRoutes.route("/projects/:id").put(function (req, response) {
  console.log("Trying put");
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  jsonPayload = parseJwt(token);

  // Check that the user is project_uploader.
  role = jsonPayload.user.role;
  user_id = jsonPayload.user._id;
  if(role!="project_uploader") {
    response.status(403).send({ message: "Response has been declined" });
  }else{
    let db_connect = dbo.getDb();
    let id_query = { _id: ObjectId( req.params.id )};
    db_connect
      .collection("projects")
      .findOne(id_query, function (err, result) {
        if (err) throw err;
        console.log("updating project"  + req.params.id)
        console.log(result);
        if (result.userid != user_id) {
          return response.status(401).send('No auth');
        } else {
          let new_values = {
            $set: {
              name: req.body.name,
              description: req.body.description,
              url: req.body.url,
              tags: req.body.tags,
            },
          };
          db_connect
            .collection("projects")
            .updateOne(id_query, new_values, function (err, res) {
              if (err) throw err;
              console.log("1 document updated")
              response.json(res);
            });
        }
      });
  }
});

// Delete a project
secureRoutes.route("projects/:id").delete(function (req, response) {
  let db_connect = dbo.getDb();
  let id_query = { _id: ObjectId( req.params.id )};
  db_connect.collection("projects").deleteOne(id_query, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

secureRoutes.route("/admin/test").get(function(req,response){
  var token = null;
  if (req && req.cookies) token = req.cookies['jwt'];
  jsonPayload = parseJwt(token);
  role = jsonPayload.user.role
  if(role!="project_uploader") {
    response.status(403).send({ message: "Response has been declined" });
  }else{
    response.status(200).send({ message: "Response has been approved" });
  }
});


module.exports = secureRoutes
