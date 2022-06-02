const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// projectRoutes is an instance of the express router.
// We define routes here.
// The router is added as a middleware and controls requests in /project.
const userRoutes = express.Router();

const secretJWT = process.env.JWTSECRET;

// Register
exports.register = (req, response, next) => {
    console.log("refactored register")
    passport.authenticate('signUp', { session: false }, (err, user, info) => {
        if (err) return err;

        if (!user) {
            response.status(409).send({
                message: info.response,
            });
        } else {
            console.log("registering user", user);
            User.updateOne({ _id: user._id }, { $set: { role: 'project_uploader' } })
            .then((updated) => {
                console.log("After role assignment:", updated);
                try {
                  req.login(user, { session: false }, async (error) => {
                      if (error) return next(error);
                      const body = { _id: user._id, email: user.email , role: 'project_uploader'};
                      const token = jwt.sign({ user: body }, secretJWT);
                      response.cookie('jwt', token, {
                          httpOnly: true,
                          maxAge: 9000000,
                      })
                      response.json({id: user._id, name: user.name, email: user.email, role: 'project_uploader'})
                  });
                } catch (err) {
                  return next(err)
                }
            })
            .catch((err) => res.status(500).send(err));
        };

    })(req, response, next);
}


exports.getUsers = (req, res, next) => {
    console.log("refactored getUsers")

    User.find({}, (err, result) => {
        console.log("USERS",result);
        res.json(result);
    });
}

// Login  
exports.login = (req, response, next) => {
    console.log("refactored login")

    passport.authenticate("login", { session: false }, async (err, user) => {
        try {
            if (err || !user) {
                console.log("unauthorized")
                console.log("Err", err);
                console.log("User", user);
                return response.status(401).send('No auth');
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = { _id: user._id, email: user.email , role: user.role};
                const token = jwt.sign({ user: body }, secretJWT);
                response.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: 9000000,
                })
                response.json({id: user._id, name: user.name, email: user.email, role: user.role})
            });
        } catch (err) {
            return next(err);
        }
    })(req, response, next);

    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
    });
};

exports.logout = (req, res) => {
    console.log("refactored logout")

    res.clearCookie("jwt");
    res.clearCookie("session").status(200).send("Successfully log out");
}

