const bcrypt = require('bcrypt');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;
const User = require('../models/User')

/* REFACTOR db_connect to mongoose Model object */

const JWTstrategy = require('passport-jwt').Strategy;
const secretJWT = process.env.JWTSECRET;

var cookieExtractor = function(req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
}

passport.use(
    new JWTstrategy(
    {
        secretOrKey: secretJWT,
        jwtFromRequest: cookieExtractor
    },
    async (token, done) => {
        try {
            return done(null, token);
        } catch (error) {
            done(error);
        }
    }
    )
);


const loginCallback = (req, email, password, done) => {

    User.findOne({ email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) throw err;
            if (res === true) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};

const loginStrategy = new PassportLocal(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    loginCallback
);

passport.use('login', loginStrategy);

const signUpCallback = (req, email, password, done) => {

    User.findOne({ email }, async (err, doc) => {
        if (err) return done(null, false, { res: err });
        if (doc) return done(null, false, { res: 'Account already exists' });

        if (!doc) {
            let hashedPassword = await bcrypt.hash(password, 10).catch((err) => {
                console.error(err);
            })

            let newUser = {
                email: email,
                password: hashedPassword,
                name: req.body.name,
                lastName: req.body.lastName,
            };

            await User.create(newUser);  // throws error
            return done(null, newUser, { res: 'Created successfully' });

        };
    });
};

const signUpStrategy = new PassportLocal(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    signUpCallback
);

passport.use('signUp', signUpStrategy);

passport.initialize();

