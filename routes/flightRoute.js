const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/flights', controller.getFlights);
router.post('/add', controller.addFlight);
router.get('/flights/:id', controller.getFlight);
router.put('/flights/:id', controller.updateFlight);
router.delete('/delete/:id', controller.deleteFlight);

module.exports = router;