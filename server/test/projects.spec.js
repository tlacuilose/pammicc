require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const Project = require('../models/Project');
const mongoDB = process.env.TEST_ATLAS_URI

let _testProject;

const EX_PROJECT = {
    name: "my project",
    description: "exampleString",
    url: "exampleString",
    tags: "exampleString",
    userid: "exampleString",
    citzn_engmnt: 3,
    complex_thinking: 3,
    ctxt_awareness: 3,
    ed_innovation: 3,
    infstctr_lvrage: 3,
    ntwork_blding: 3,
    outreach_scale: 3,
    tech_innovation: 2,
}

describe('Test Project Model', () => {

    beforeEach(function (done) {
        this.timeout(10000);
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', async function(){  
            _testProject = await Project.create(EX_PROJECT)
            done();
        })
    })

    afterEach(async function(){
        this.timeout(5000);
        await Project.deleteMany({})
        const db = mongoose.connection
        db.close()
    })

    describe('Project.get', function () {
        this.timeout(20000);
        it('should fetch a Project without error', async () => {
            // Make a reservation for bicycle with code 99
            const project = await Project.findOne({name: "my project"});
            assert.equal(project.url, "exampleString")
            assert.ok(project._id);                    
        })
    })
    
    describe('Project.create', function () {
        this.timeout(20000);
        it('should create a Project without error', async () => {
            // Make a reservation for bicycle with code 99
            const testProject = await Project.create({
                ...EX_PROJECT,
                name: "Another Project",
                description: "this time it's different",
                tech_innovation: 3,
            });
            assert.equal(testProject.name, "Another Project")
            assert.equal(testProject.tech_innovation, 3)
            assert.ok(testProject._id);                    
        })
    })
    /*
    describe('Project.update', function () {
        this.timeout(20000);
        it('should update a Project without error', async () => {
            // Make a reservation for bicycle with code 99
            let testProject = await Project.findOne({email: "test@test.com"});

            assert.notEqual(testProject.name, "something else");
            testProject.name = "something else";
            await testProject.save();
            
            testProject = await Project.findOne({email: "test@test.com"});
            assert.equal(testProject.name, "something else");
        })
    })


    describe('Project.delete', function () {
        this.timeout(20000);
        it('should delete a Project without error', async () => {
            // Make a reservation for bicycle with code 99
            let testProject = await Project.findOne({email: "test@test.com"});
            assert.ok(testProject._id);
            await Project.findOneAndDelete({email: "test@test.com"});

            testProject = await Project.findOne({email: "test@test.com"});
            assert.equal(testProject, null);

        })
    })
    */
    
    
})