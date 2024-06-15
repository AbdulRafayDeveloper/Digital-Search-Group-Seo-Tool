const express = require('express');
const Router = express.Router();
const Sectors = require('../models/Sectors');
const Services = require('../models/Services');

Router.addSector = async (req, res) => {
    try {
        const { name, bussinessDisciplines } = req.body;

        if (name && bussinessDisciplines) {
            const findSectorExistence = await Sectors.find({ name: name });

            if (findSectorExistence.length > 0) {
                res.json({ status: 400, message: "This Sector Already Exists" });
            }
            else {
                let tagsBussinessDisciplines;
                if (Array.isArray(bussinessDisciplines)) {
                    tagsBussinessDisciplines = bussinessDisciplines;
                } else if (typeof bussinessDisciplines === 'string') {
                    tagsBussinessDisciplines = bussinessDisciplines.split(",");
                } else {
                    tagsBussinessDisciplines = [bussinessDisciplines];
                }

                const sectorData = new Sectors({
                    name: name,
                    bussinessDisciplines: tagsBussinessDisciplines
                });

                await sectorData.save();
                res.json({ status: 200, data: sectorData, message: "Sector Added Successfully" });
            }
        }
        else {
            res.json({ status: 400, message: "Please Input All Required Information" });
        }
    } catch (error) {
        console.log("error 3", error);
        res.json({ status: 500, error: 'An error occurred in uploading the image' });
    }
};

Router.listOfSectors = async (req, res) => {
    try {
        const sectorsData = await Sectors.find();
        res.json({ status: 200, data: sectorsData });
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.listOfSectorsName = async (req, res) => {
    try {
        const sectorsData = await Sectors.find();
        const sectorNames = sectorsData.map(sector => sector.name); // Extract names from sectorsData
        res.json({ status: 200, data: sectorNames }); // Send names array in response data
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.listOfBusinessDisciplines = async (req, res) => {
    try {
        let sectorName = req.params.name + " ";
        const sectorsData = await Sectors.find({ name: sectorName });
        const sectorsData2 = await Sectors.find({ name: req.params.name });
        console.log("Backend sectorsData with space: ", sectorsData);
        console.log("Backend sectorsData without space: ", sectorsData2);

        // Check if sectorsData is not empty
        if (sectorsData.length > 0) {
            const bussinessDisciplinesNames = sectorsData[0].bussinessDisciplines;
            res.json({ status: 200, data: bussinessDisciplinesNames }); // Send names array in response data
        } else if (sectorsData2.length > 0) {
            const bussinessDisciplinesNames = sectorsData2[0].bussinessDisciplines;
            res.json({ status: 200, data: bussinessDisciplinesNames }); // Send names array in response data
        } else {
            res.json({ status: 404, error: 'Sector not found' });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.getSector = async (req, res) => {
    try {
        const checkSector = await Sectors.findById(req.params.id);
        if (checkSector) {
            res.json({ status: 200, message: "Sector get Successfully", data: checkSector });
        } else {
            res.json({ status: 400, message: "Sector not found" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.updateSector = async (req, res) => {
    try {
        const { name, bussinessDisciplines } = req.body;

        if (name && bussinessDisciplines) {
            const checkSector = await Sectors.findById(req.params.id);
            if (checkSector) {
                const updateObject = {
                    name: name,
                    bussinessDisciplines: bussinessDisciplines
                };

                await Sectors.findByIdAndUpdate({ _id: req.params.id }, { $set: updateObject })
                res.json({ status: 200, message: "Update Successfully" });
            } else {
                res.json({ status: 400, message: "Sector not found" });
            }
        } else {
            res.json({ status: 400, message: "Please Fill All Fields" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.deleteSector = async (req, res) => {
    try {
        const sectorId = req.params.id;

        // Check if the sector exists
        const checkSector = await Sectors.findById(sectorId);

        if (!checkSector) {
            // If the sector doesn't exist, return early with a clear message
            return res.status(404).json({ message: 'Sector not found' });
        }

        // Delete the sector
        await Sectors.findByIdAndDelete(sectorId);

        // Delete all services where the sector name matches
        const sectorName = checkSector.name;
        const deletedServices = await Services.deleteMany({ sectorName });

        console.log(`Deleted ${deletedServices.deletedCount} service(s) for sector: ${sectorName}`);

        // Provide a comprehensive success message
        res.status(200).json({
            message: 'Sector and related services deleted successfully',
            deletedServicesCount: deletedServices.deletedCount,
        });
    } catch (error) {
        console.error('Error while deleting sector and services:', error);

        // Return a clear error message
        res.status(500).json({ message: 'An error occurred while deleting the sector', error: error.message });
    }
};

module.exports = Router;