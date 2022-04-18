const express = require("express");
const passport = require("passport");


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
                response.status(200).send({ message: info.response });
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
                return response.cookie('session', user, {
                    httpOnly: true,
                    maxAge: 9000000,
                })
                .send('Auth cookie created');
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
    res.clearCookie("session").status(200).send("Successfully log out");
});

module.exports = userRoutes;
