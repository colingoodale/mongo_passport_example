const path = require("path");
const express = require('express');
const router = express.Router();
const passportRoutes = require("./passportRoutes");

router.use("/auth", passportRoutes);

router.use((req, res) => res.sendFile(path.join(__dirname, "../../client/build/index.html")));

module.exports = router;