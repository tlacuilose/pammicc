const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const userController = require('../controllers/usersController')
// projectRoutes is an instance of the express router.
// We define routes here.
// The router is added as a middleware and controls requests in /project.
const userRoutes = express.Router();


// Register
userRoutes.route('/register').post(userController.register);

// Login
userRoutes.route('/login').post(userController.login);

// Logout
userRoutes.route('/logout').get(userController.logout);

// Get Users
userRoutes.route('/getUsers').get(userController.getUsers);

module.exports = userRoutes;
