const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    url: {
        type: String,
        required:true,
    },
    tags: {
        type: String,
        required:true,
    },
    userid: {
        type: String,
        required:true,
    },
    citzn_engmnt: {
        type: Number,
        required:true,
    },
    complex_thinking: {
        type: Number,
        required:true,
    },
    ctxt_awareness: {
        type: Number,
        required:true,
    },
    ed_innovation: {
        type: Number,
        required:true,
    },
    infstctr_lvrage: {
        type: Number,
        required:true,
    },
    ntwork_blding: {
        type: Number,
        required:true,
    },
    outreach_scale: {
        type: Number,
        required:true,
    },
    tech_innovation: {
        type: Number,
        required:true,
    }
})


module.exports = mongoose.model("Project", ProjectSchema);
