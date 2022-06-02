require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const User = require('../models/User');
const { findOneAndDelete } = require('../models/User');
const mongoDB = process.env.TEST_ATLAS_URI

let _testUser;

describe('Test User Model', () => {

    beforeEach(function (done) {
        this.timeout(10000);
        mongoose.connect(mongoDB, {useNewUrlParser: true})

        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', async function(){  
            _testUser = await User.create({name: "Test", email:"test@test.com", password: "$hash"})
            done();
        })
    })

    afterEach(async function(){
        this.timeout(5000);
        await User.deleteMany({})
        const db = mongoose.connection
        db.close()
    })

    describe('User.get', function () {
        this.timeout(20000);
        it('should fetch a User without error', async () => {
            // Make a reservation for bicycle with code 99
            const user = await User.findOne({email: "test@test.com"});
            assert.equal(user.name, "Test")
            assert.ok(user._id);                    
        })
    })
    
    describe('User.create', function () {
        this.timeout(20000);
        it('should create a User without error', async () => {
            // Make a reservation for bicycle with code 99
            const testUser = await User.create({email: "create@req.com"});
            assert.equal(testUser.email, "create@req.com")
            assert.ok(testUser._id);                    
        })
    })

    describe('User.update', function () {
        this.timeout(20000);
        it('should update a User without error', async () => {
            // Make a reservation for bicycle with code 99
            let testUser = await User.findOne({email: "test@test.com"});

            assert.notEqual(testUser.name, "something else");
            testUser.name = "something else";
            await testUser.save();
            
            testUser = await User.findOne({email: "test@test.com"});
            assert.equal(testUser.name, "something else");
        })
    })


    describe('User.delete', function () {
        this.timeout(20000);
        it('should delete a User without error', async () => {
            // Make a reservation for bicycle with code 99
            let testUser = await User.findOne({email: "test@test.com"});
            assert.ok(testUser._id);
            await User.findOneAndDelete({email: "test@test.com"});

            testUser = await User.findOne({email: "test@test.com"});
            assert.equal(testUser, null);

        })
    })
    
    
})