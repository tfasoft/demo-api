const express = require("express");

const controllers = require("../controllers/BugControllers");

const router = express.Router();

router.post('/new', controllers.newBug);

module.exports = router;