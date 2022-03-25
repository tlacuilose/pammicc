// User express
const express = require("express");
// Use cross origin resource sharing
const cors = require("cors");
// Use dotenv to get environment variables.
require("dotenv").config({path: "./config.env"})
// Get driver connection
const dbo = require("./db/conn")

// Get Port from .env
const port = process.env.PORT || 5001;

// Start express app.
const app = express();
app.use(cors());
app.use(express.json());
app.use(require("./routes/project"));


app.listen(port, () => {
  // Perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });

  console.log(`Server is running on port: ${port}`);
})


