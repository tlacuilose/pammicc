// User express
const express = require("express");
// Use cross origin resource sharing
const cors = require("cors");
// Use dotenv to get environment variables.
require("dotenv").config()
// Get driver connection
const dbo = require("./db/conn")

require('./configs/passport');

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const secureRoutes = require("./routes/secure-routes");

//JWT Middleware
// require('./auth/auth');

// Get Port from .env
const port = process.env.PORT;

// Start express app.
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRET || 'secret'));
app.use(session({
  secret: process.env.SECRET || 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true 
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(require("./routes/project"));
app.use(require('./routes/user'));
app.use(passport.authenticate('jwt',{session:false}),secureRoutes)


app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);
})


