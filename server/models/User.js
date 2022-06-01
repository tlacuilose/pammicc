const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
        
    },
    name: {
        type: String,   
    },
    lastName: {
        type: String,
    },
    role: {
        type: String,
    },
})


module.exports = mongoose.model("User", UserSchema);
