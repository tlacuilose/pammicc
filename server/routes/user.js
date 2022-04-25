const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');

// projectRoutes is an instance of the express router.
// We define routes here.
// The router is added as a middleware and controls requests in /project.
const userRoutes = express.Router();

// Helps in db connection.
const dbo = require("../db/conn")

// Converts id from string to ObjectId
const ObjectId = require("mongodb").ObjectId;



// Register
userRoutes.route('/register').post((req, response, next) => {
    let db_connect = dbo.getDb();

    passport.authenticate('signUp', { session: false }, (err, user, info) => {
        if (err) return err;

        if (!user) {
            response.status(409).send({
                message: info.response,
            });
        } else {
            db_connect.collection('users').updateOne({ _id: user._id }, { $set: { role: 'project_uploader' } })
            .then(() => {
                try {
                  req.login(user, { session: false }, async (error) => {
                      if (error) return next(error);
                      const body = { _id: user._id, email: user.email , role: 'project_uploader'};
                      const safeUser = { _id: user._id, name: user.name, email: user.email , role: 'project_uploader'};
                      const token = jwt.sign({ user: body }, 'TOP_SECRET');  //change TOP_SECRET for env variable in prod
                      response.cookie('session', safeUser, {
                          httpOnly: false,
                          maxAge: 9000000,
                      })
                      response.cookie('jwt', token, {
                          httpOnly: false,
                          maxAge: 9000000,
                      })
                      .send('Auth cookie created ' + token);
                  });
                } catch (err) {
                  return next(err)
                }
            })
            .catch((err) => res.status(500).send(err));
        };
    })(req, response, next);
});

userRoutes.route('/getUsers').get((req, res, next) => {
    let db_connect = dbo.getDb();

    db_connect.collection('users').find({}).toArray((err, result) => res.json(result));
})

// Login
userRoutes.route('/login').post((req, response, next) => {
    let db_connect = dbo.getDb();

    passport.authenticate("login", { session: false }, async (err, user) => {
        try {
            if (err || !user) {
                return response.status(401).send('No auth');
            }
            req.login(user, { session: false }, async (error) => {
                if (error) return next(error);
                const body = { _id: user._id, email: user.email , role: user.role};
                const safeUser = { _id: user._id, name: user.name, email: user.email , role: user.role};
                const token = jwt.sign({ user: body }, 'TOP_SECRET');  //change TOP_SECRET for env variable in prod
                response.cookie('session', safeUser, {
                    httpOnly: false,
                    maxAge: 9000000,
                })
                response.cookie('jwt', token, {
                    httpOnly: false,
                    maxAge: 9000000,
                })
                .send('Auth cookie created ' + token);
            });
        } catch (err) {
            return next(err);
        }
    })(req, response, next);

    passport.authenticate('login', {
        successRedirect: '/',
        failureRedirect: '/login',
    });
});

userRoutes.route('/logout').get((req, res) => {
    res.clearCookie("jwt");
    res.clearCookie("session").status(200).send("Successfully log out");
});

module.exports = userRoutes;
