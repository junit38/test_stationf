var express = require('express');
var router = express.Router();
var roomsController = require('../controllers/roomsController');

router.get('/', roomsController.get);

module.exports = router;
