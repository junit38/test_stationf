var express = require('express');
var router = express.Router();
var reservationsController = require('../controllers/reservationsController');

router.post('/', reservationsController.getOccupiedByName, reservationsController.create);
router.post('/occupied', reservationsController.getOccupied, reservationsController.send);

module.exports = router;
