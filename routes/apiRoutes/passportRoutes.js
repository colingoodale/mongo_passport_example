const router = require('express').Router();
const passport = require('passport');
const passportControllers = require("../../controllers/passportControllers");

router.post("/login", passport.authenticate('local'), passportControllers.login);
router.post("/signup", passportControllers.signup);
router.get("/user-data", passportControllers.getUser);
router.get("/logout", passportControllers.logout);


module.exports = router;