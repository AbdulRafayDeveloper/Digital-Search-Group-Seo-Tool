const express = require('express');
const Router = express.Router();
const Customers = require('../models/Customers');
const cors = require("cors");
Router.use(cors());

Router.addCustomer = async (req, res) => {
    try {
        const { sector, bussinessDiscipline, services, name, email, website, country, state, radius, zipCode, keywords } = req.body;

        if (sector && bussinessDiscipline && services && name && email && website && country && state && radius && zipCode && keywords) {
            if (!Array.isArray(keywords)) {
                res.json({ status: 400, message: "Keywords must be an array of strings" });
                return;
            }

            const findCustomerExistence = await Customers.find({ customerEmail: email });

            if (findCustomerExistence.length > 0) {
                res.json({ status: 400, message: "This Customer Already Exists" });
            }
            else {
                const customerData = new Customers({
                    sector: sector,
                    bussinessDiscipline: bussinessDiscipline,
                    services: services,
                    customerName: name,
                    customerEmail: email,
                    website: website,
                    country: country,
                    state: state,
                    radius: radius,
                    zipCode: zipCode,
                    keywords: keywords
                });

                await customerData.save();
                res.json({ status: 200, data: customerData, message: "Information has been submitted to digitalsearchgroup administration." });
            }
        }
        else {
            res.json({ status: 400, message: "Please Input All Required Information" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred in catch Block' });
    }
};

Router.listOfCustomers = async (req, res) => {
    try {
        const customersData = await Customers.find();
        res.json({ status: 200, data: customersData });
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.listOfKeywords = async (req, res) => {
    try {
        const customersData = await Customers.findById(req.params.id);
        res.json({ status: 200, data: customersData.keywords, dataName: customersData.customerName, dataEmail: customersData.customerEmail });
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

Router.deleteKeyword = async (req, res) => {
    try {
        const { customerId, keywordId } = req.query; // Get customer and keyword IDs from query parameters

        // Find the customer by ID and remove the keyword object from the array
        const updatedCustomer = await Customers.findByIdAndUpdate(
            customerId,
            { $pull: { keywords: { _id: keywordId } } }, // Use $pull to remove the specific keyword object
            { new: true } // Return the updated customer data
        );

        if (updatedCustomer) {
            res.json({ status: 200, message: 'Keyword deleted successfully', data: updatedCustomer });
        } else {
            res.json({ status: 404, message: 'Customer not found' }); // If the customer does not exist
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ status: 500, error: 'An error occurred while deleting the keyword.' }); // Adjusted error message
    }
};

Router.deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params; // Extracting the id parameter

        const deletedCustomer = await Customers.findByIdAndDelete(id); // Delete the customer directly and capture the deleted document

        if (deletedCustomer) {
            res.json({ status: 200, message: 'Customer deleted Successfully' });
        } else {
            res.json({ status: 404, message: 'Customer not found' }); // Return a 404 status if the customer doesn't exist
        }
    } catch (error) {
        console.error('Error:', error); // Improved error logging
        res.json({ status: 500, error: 'An error occurred while deleting the customer.' }); // Adjusted error message
    }
};

module.exports = Router;