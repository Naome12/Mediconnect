const express = require('express');
const router = express.Router();
const ambulanceController = require('../controllers/ambulanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/ambulances', ambulanceController.getAmbulances);
router.post('/ambulances', ambulanceController.createAmbulance);
router.put('/ambulances/:id', ambulanceController.updateAmbulance);
router.delete('/ambulances/:id', ambulanceController.deleteAmbulance);

module.exports = router;