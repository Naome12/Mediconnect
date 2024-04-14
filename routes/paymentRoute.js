const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/payment-methods', paymentController.addPaymentMethod);
router.get('/payment-methods', paymentController.getPaymentMethods);
router.put('/payment-methods/:id', paymentController.updatePaymentMethod);
router.delete('/payment-methods/:id', paymentController.deletePaymentMethod);
router.post('/payments', paymentController.processPayment);

module.exports = router;