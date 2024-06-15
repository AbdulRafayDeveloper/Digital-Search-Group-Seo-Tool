const express = require('express');
const sectorController = require('../controllers/sectorController');

const router = express.Router();

router.post('/addSector', sectorController.addSector);
router.get('/listOfSectors', sectorController.listOfSectors);
router.get('/listOfSectorsName', sectorController.listOfSectorsName);
router.get('/listOfBusinessDisciplines/:name', sectorController.listOfBusinessDisciplines);
router.delete('/deleteSector/:id', sectorController.deleteSector);
router.get('/getSector/:id', sectorController.getSector);
router.put('/updateSector/:id', sectorController.updateSector);

module.exports = router;
