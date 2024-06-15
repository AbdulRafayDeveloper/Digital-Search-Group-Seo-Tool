const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const cors = require("cors");
router.use(cors());

router.post('/login', userController.login);
// router.post('/logout', userController.logout);
router.get('/listOfCustomers', userController.listOfCustomers);
router.get('/dashboardStatistics', userController.dashboardStatistics);
router.delete('/deleteCustomer/:id', userController.deleteCustomer);

module.exports = router;