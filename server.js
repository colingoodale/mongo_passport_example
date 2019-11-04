const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("./config/passport");

const db = ('./models');
const app = express();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
//the sets express session, refer to documentation for arguments
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
//passport initailization, aka allows passport to run protected routes and utlize bcrypt to securely transefer hashed data
app.use(passport.initialize());
app.use(passport.session());

// Add routes
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/escapeChicagoDB", { useNewUrlParser: true, unifiedTopology: true });


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
