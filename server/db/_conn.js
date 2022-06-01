const mongoose = require('mongoose');

// Mongoose Setup
const URI = process.env.ATLAS_URI;
const DB_NAME = process.env.DB_NAME;

var dbConn;

module.exports = {
    connectToServer: function (callback) {
        mongoose.connect(URI, (err) => {
            if (err) {
                console.log("Mongoose Connection Error! :(")
            } else {
                console.log("Mongoose connected succesfully :)")
                dbConn = mongoose.connection;
            }
            return callback(err);
        });
    },

    getDb: function () {
        return dbConn;  // mongoose.connection
    }
}