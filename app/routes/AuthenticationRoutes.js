const express = require("express");
const controllers = require("../controllers/AuthenticationControllers");

const router = express.Router();

router.post('/telegram', controllers.TelegramAuthentication);

module.exports = router;