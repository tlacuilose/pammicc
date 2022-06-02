/* TEST API ENDPOINTS: REQ-RES CYCLE */
require('dotenv').config()
const mongoose = require('mongoose')
const assert = require('assert');
const User = require('../models/User')
const Project = require('../models/Project')
const axios = require('axios');
const bcrypt = require('bcrypt');

const port = process.env.PORT
let _testUser;

let BASE_URL = `http://localhost:${port}`;
let PROJECTS_URL = `http://localhost:${port}/projects`;

describe('Test Users API endpoints', () => {

    // Open db connection
    before(function(done) {
        // Create a test user

        this.timeout(10000);
        const mongoDB = process.env.TEST_ATLAS_URI;
        mongoose.connect(mongoDB, {useNewUrlParser: true})
        const db = mongoose.connection
        db.on('error', console.error.bind(console, 'connection error'))
        db.once('open', async function(){
            console.log("test suite connected succesfully to mongodb")
            _testUser = await User.create({
                email: 'user@user.com'
            })

            done()
        })
    })

    // Close db connection 
    after(async function() {
        await User.deleteMany();
        await Project.deleteMany();
        const db = mongoose.connection
        db.close()
    })

    /* --- USERS ENDPOINTS --- */

    // 1. REGISTER NEW USER CORRECTLY
    describe('POST /register', ()=>{
        it('should register a User and correctly hash the password', async ()=>{
            
            const values = {
                name: "Alec",
                lastName: "Daniel",
                email: "a@dan.com",
                password: "$hashpassword"
              }
            const resp = await axios.post(BASE_URL + '/register',values);
            const data = resp.data

            assert.ok(data);
            assert.equal(data.name, "Alec")
            assert.equal(data.email, "a@dan.com")
            assert.ok(data.role);
            assert.equal(data.role, "project_uploader");
            assert.notEqual(data.password, "$hashpassword");

            // Make sure pw is hashed correctly in DB

            const userInDb = await User.findOne({email: data.email});
            assert.ok(userInDb.password);

            bcrypt.compare(values.password, userInDb.password, (err, res) => {
                assert.equal(err, null);
                assert.equal(res, true);
            });
        })
    });

    // 2. GET ALL
    describe('GET USERS', ()=>{
        it('should return a list with users', async () => {
            const {data} = await axios.get(BASE_URL + '/getUsers');
            assert.ok(data.length);
        })
    });

    // 3. LOG IN DENIED
    describe('LOGIN USER', () => {
        it('should deny incorrect login', async () => {
            const credentials = {
                email: "a@dan.com",
                password: "wrong_password!"
            }
            let resp;
            try {
                resp = await axios.post(BASE_URL + '/login', credentials);
                throw new Error("Did not throw error");                
            } catch (e) {
                // Status 401
                assert.ok(e['response']['status'], 401);
                assert.ok(e['response']['statusText'], 'Unauthorized');
            }
        })
    })

    // 4. LOG IN OK
    describe('LOGIN USER', () => {
        it('should succesfully login', async () => {
            const credentials = {
                email: "a@dan.com",
                password: "$hashpassword"
            }
            let resp;
            resp = await axios.post(BASE_URL + '/login', credentials);
            //console.log("RESPONSE", resp);
           
        })
    })


    /*--- PROJECTS ---*/
    describe('CREATE PROJECT', () => {
        it('should create project', async () => {
            const credentials = {
                email: "a@dan.com",
                password: "$hashpassword"
            }
            let resp;
            resp = await axios.post(BASE_URL + '/login', credentials);
            let cookie;
            try {
                cookie = resp['headers']['set-cookie'][0] //.split(';')[0];
            } catch (e) {
                console.log("cookie ERROR", e);
            }
            const project = {
                name: "value",
                description: "value",
                url: "value",
                tags: "value",
                userid: "value",
                ctxt_awareness: 0,
                citzn_engmnt: 0,
                infstctr_lvrage: 0,
                tech_innovation: 0,
                ed_innovation: 0,
                outreach_scale: 0,
                ntwork_blding: 0,
                complex_thinking: 0
            }
            try {
                resp = await axios.post(PROJECTS_URL + '/new', project ,{
                    headers:{Cookie: cookie},
                });
            } catch (e) {
                console.log("Denied error", e);
                
                assert.equal(e['response']['status'], 403);
                assert.equal(e['response']['statusText'], 'Unauthorized');
            }
           
        })
    })

})