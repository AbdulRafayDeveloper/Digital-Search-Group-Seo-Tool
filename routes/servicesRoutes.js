const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.post('/addService', serviceController.addService);
router.get('/listOfServices', serviceController.listOfServices);
router.delete('/deleteService/:id', serviceController.deleteService);
router.get('/getService/:id', serviceController.getService);
router.put('/updateService/:id', serviceController.updateService);
router.post('/ServicesForSelectedBusinessDiscipline', serviceController.ServicesForSelectedBusinessDiscipline);

module.exports = router;