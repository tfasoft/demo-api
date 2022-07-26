const express = require('express');
const controllers = require('../controllers/UserControllers');

const router = express.Router();

router.post('/info', controllers.info);

module.exports = router;