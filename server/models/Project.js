const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    },
    userid: {
        type: String,
    },
    citzn_engmnt: {
        type: Number,
    },
    complex_thinking: {
        type: Number,
    },
    ctxt_awareness: {
        type: Number,
    },
    ed_innovation: {
        type: Number,
    },
    infstctr_lvrage: {
        type: Number,
    },
    ntwork_blding: {
        type: Number,
    },
    outreach_scale: {
        type: Number,
    },
    tech_innovation: {
        type: Number,
    }
})


module.exports = mongoose.model("Project", ProjectSchema);
