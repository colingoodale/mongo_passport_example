const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require("../models");

//Configuring Local-Passport
passport.use(new LocalStrategy(
    //Assigning a username for our strategy, in this instance the email. 
    //Can be changed here to a username or another moniker.
    {
        usernameField: 'email'
    },
    (email, password, done) => {
        //This code will run whenever a User attempts to sign in
        db.User.find({ email: email }).then((dbUser) => {
            if (!dbUser) {
                //Email does not exist in our database
                return done(null, false, { message: "This email doesn't have an account yet, please sign up." });
            } else if (!dbUser.validPassword) {
                //The password does not match the one assocaited with the User
                return done(null, false, { message: "Incorrect Password." });
            }
            //return User if the pass
            return done(null, dbUser);
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Mongoose needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser((user, cb) => cb(null, user));

passport.deserializeUser((obj, cb) => cb(null, obj));

// Exporting our configured passport
module.exports = passport;