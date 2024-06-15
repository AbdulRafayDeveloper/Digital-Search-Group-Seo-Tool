const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();
const cors = require("cors");
router.use(cors());

router.post('/addCustomer', customerController.addCustomer);
router.get('/listOfCustomers', customerController.listOfCustomers);
router.get('/listOfKeywords/:id', customerController.listOfKeywords);
router.delete('/deleteCustomer/:id', customerController.deleteCustomer);
router.delete('/deleteKeyword', customerController.deleteKeyword);

module.exports = router;