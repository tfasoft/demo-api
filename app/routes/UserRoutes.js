const express = require('express');
const controllers = require('../controllers/UserControllers');

const router = express.Router();

router.post('/info', controllers.info);
router.post('/update', controllers.update);

module.exports = router;