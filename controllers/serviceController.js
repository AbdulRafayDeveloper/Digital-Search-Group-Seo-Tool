const express = require('express');
const Router = express.Router();
const Services = require('../models/Services');

Router.addService = async (req, res) => {
    try {
        const { sectorId, sectorName, bussinessDiscipline, services } = req.body;

        if (sectorId && sectorName && services) {
            const findServiceExistence = await Services.find({ sectorId: sectorId, bussinessDiscipline: bussinessDiscipline });

            if (findServiceExistence.length > 0) {
                res.json({ status: 400, message: "Service for this business discipline in the required sector already exists." });
            }
            else {
                const ServiceData = new Services({
                    sectorId: sectorId,
                    sectorName: sectorName,
                    bussinessDiscipline: bussinessDiscipline,
                    services: services
                });

                await ServiceData.save();
                res.json({ status: 200, data: ServiceData, message: "Service Added Successfully" });
            }
        }
        else {
            res.json({ status: 400, message: "Please Input All Required Information" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred in inserting the record' });
    }
};

Router.listOfServices = async (req, res) => {
    try {
        const ServicesData = await Services.find();
        res.json({ status: 200, data: ServicesData });
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.getService = async (req, res) => {
    try {
        const checkService = await Services.findById(req.params.id);
        if (checkService) {
            res.json({ status: 200, message: "Service get Successfully", data: checkService });
        } else {
            res.json({ status: 400, message: "Service not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.ServicesForSelectedBusinessDiscipline = async (req, res) => {
    try {
        const findServiceExistence = await Services.find({ sectorName: req.body.sectorName, bussinessDiscipline: req.body.bussinessDiscipline });
        
        if (findServiceExistence.length > 0) {
            res.json({ status: 200, message: "Service get Successfully", data: findServiceExistence[0].services });
        } else {
            res.json({ status: 400, message: "Service not found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.updateService = async (req, res) => {
    try {
        const { sectorId, sectorName, bussinessDiscipline, services } = req.body;

        if (sectorId && sectorName && bussinessDiscipline && services) {
            const checkService = await Services.findById(req.params.id);
            if (checkService) {
                checkService.services = services;
                await checkService.save();
                res.json({ status: 200, message: "Update Successfully" });
            } else {
                res.json({ status: 400, message: "Record not found" });
            }
        } else {
            res.json({ status: 400, message: "Please Fill All Fields" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.deleteService = async (req, res) => {
    try {
        const checkService = await Services.findById(req.params.id);
        if (checkService) {
            await Services.findByIdAndRemove(req.params.id);
            res.json({ status: 200, message: 'Service deleted Successfully' });
        } else {
            res.json({ status: 400, message: 'Service not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the record.' });
    }
};

module.exports = Router;