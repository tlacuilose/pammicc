const User = require("../models/User");
const Project = require("../models/Project");

exports.getProjects = function (req, res) {
    let db_connect = dbo.getDb();
    db_connect
        .collection("projects")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
}

exports.getById = function (req, res) {
    console.log("Trying get");
    let db_connect = dbo.getDb();
    let id_query = { _id: ObjectId(req.params.id) };
    db_connect
        .collection("projects")
        .findOne(id_query, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
}

exports.newProject = function (req, response) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    jsonPayload = parseJwt(token);

    // Check that the user is project_uploader.
    role = jsonPayload.user.role
    if (!(role == "project_uploader" || role == "admin")) {
        response.status(403).send({ message: "Response has been declined" });
    } else {
        let db_connect = dbo.getDb();
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
        db_connect.collection("projects").insertOne(project, function (err, res) {
            if (err) throw err;
            response.status(200).send({ message: "Response has been approved" });
        });
    }
}


exports.updateProject = function (req, response) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    jsonPayload = parseJwt(token);
  
    // Check that the user is project_uploader.
    role = jsonPayload.user.role;
    user_id = jsonPayload.user._id;
    if(!(role=="project_uploader" || role=="admin")) {
      response.status(403).send({ message: "Response has been declined" });
    }else{
      let db_connect = dbo.getDb();
      let id_query = { _id: ObjectId( req.params.id )};
      db_connect
        .collection("projects")
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
  }


exports.deleteProject = function (req, response) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    jsonPayload = parseJwt(token);
  
    // Check that the user is project_uploader.
    role = jsonPayload.user.role;
    user_id = jsonPayload.user._id;
    if(!(role=="project_uploader" || role=="admin")) {
      response.status(403).send({ message: "Response has been declined" });
    }else{
      let db_connect = dbo.getDb();
      let id_query = { _id: ObjectId( req.params.id )};
      db_connect
        .collection("projects")
        .findOne(id_query, function (err, result) {
          if (err) throw err;
          console.log("updating project"  + req.params.id)
          if (!(result.userid == user_id || role=="admin")) {
            return response.status(401).send('No auth');
          } else {
            let db_connect = dbo.getDb();
            let id_query = { _id: ObjectId( req.params.id )};
            db_connect.collection("projects").deleteOne(id_query, function (err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              response.json(obj);
            });
          }
        });
    }
  }