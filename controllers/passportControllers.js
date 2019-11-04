const db = require('../models');
const passport = require("../config/passport");

module.exports = {
    login: (req, res) => { res.json("/members") },
    //this route signs a user up
    signup: (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(() => { res.redirect(307, "/login"); }).catch((err) => res.json(err));
    },
    //gets user data and check whether this user should have data gotten
    getUser: (req, res) => {
        if (!req.user) { res.json({}); }
        else { res.json({ email: req.user.email, id: req.user.id }); }
    },
    //this controls our logout
    logout: (req, res) => { req.logout(); res.redirect("/"); }

};