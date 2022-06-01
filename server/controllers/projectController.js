const User = require("../models/User");
const Project = require("../models/Project");
// Helps in db connection.
const dbo = require("../db/conn")

// Converts id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;

exports.getProjects = function (req, res) {
  //let db_connect = dbo.getDb();
  console.log("refactored get all projects");

  Project
    .find({},function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

exports.getById = function (req, res) {
  console.log("refactored get project");

  let id_query = { _id: ObjectId(req.params.id) };
  Project
    .findOne(id_query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
}

exports.newProject = function (req, response) {
  console.log("refactored new project");
  const jsonPayload = response.locals.jsonPayload; 

  let project = {
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    tags: req.body.tags,
    ctxt_awareness: req.body.ctxt_awareness,
    citzn_engmnt: req.body.citzn_engmnt,
    infstctr_lvrage: req.body.infstctr_lvrage,
    tech_innovation: req.body.tech_innovation,
    ed_innovation: req.body.ed_innovation,
    outreach_scale: req.body.outreach_scale,
    ntwork_blding: req.body.ntwork_blding,
    complex_thinking: req.body.complex_thinking,
    userid: jsonPayload.user._id
  };
  Project.create(project, function (err, res) {
    if (err) throw err;
    response.status(200).send({ message: "Response has been approved" });
  });

}


exports.updateProject = function (req, response) {
  console.log("refactored update project");

  let id_query = { _id: ObjectId(req.params.id) };
  Project
    .findOne(id_query, function (err, result) {
      if (err) throw err;
      if (!(result.userid == user_id || role == 'admin')) {
        return response.status(401).send('No auth');
      } else {
        let new_values = {
          $set: {
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
            tags: req.body.tags,
            ctxt_awareness: req.body.ctxt_awareness,
            citzn_engmnt: req.body.citzn_engmnt,
            infstctr_lvrage: req.body.infstctr_lvrage,
            tech_innovation: req.body.tech_innovation,
            ed_innovation: req.body.ed_innovation,
            outreach_scale: req.body.outreach_scale,
            ntwork_blding: req.body.ntwork_blding,
            complex_thinking: req.body.complex_thinking,
          },
        };
        
        Project
          .updateOne(id_query, new_values, function (err, res) {
            if (err) throw err;
            console.log("1 document updated")
            response.json(res);
          });
      }
    });

}


exports.deleteProject = function (req, response) {
  console.log("refactored delete project");

  let id_query = { _id: ObjectId(req.params.id) };

  Project.deleteOne(id_query, function (err, result) {
    if (err) throw err;
    console.log("updating project" + req.params.id)
    if (!(result.userid == user_id || role == "admin")) {
      return response.status(401).send('No auth');
    } else {
      let id_query = { _id: ObjectId(req.params.id) };
      Project.deleteOne(id_query, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
      });
    }
  })

}