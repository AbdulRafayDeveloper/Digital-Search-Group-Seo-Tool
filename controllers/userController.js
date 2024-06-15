const express = require('express');
const bcrypt = require('bcrypt'); // Import bcrypt
const Router = express.Router();
const Users = require('../models/Users');
const Sectors = require('../models/Sectors');
const Customers = require('../models/Customers');
const Services = require('../models/Services');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "SecurityInsure";
const cors = require("cors");
Router.use(cors());

Router.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const user = await Users.findOne({ email: email });
            if (user) {
                // Compare the provided password with the stored hashed password
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    const token = jwt.sign(
                        {
                            id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                        },
                        JWT_SECRET,
                        { expiresIn: '1y' }
                    );

                    res.json({ status: 200, message: "Login Successful", data: user, token: token });
                } else {
                    res.json({ status: 400, message: "Password Not Match." });
                }
            } else {
                res.json({ status: 400, message: "This Account Does Not Exist." });
            }
        } else {
            res.json({ status: 400, message: "Please Input All Required Information" });
        }
    } catch (error) {
        console.error(error);
        res.json({ status: 500, message: "An error occurred while processing your request" });
    }
};

// // logout
// Router.logout = async (req, res) => {
//     try {
//         console.log("1 ");
//         const { token } = req.body;
//         console.log("Token: ", token);
//         const decodedToken = jwt.verify(token, JWT_SECRET);
//         console.log("decodedToken: ", decodedToken);
//         const userId = decodedToken.id;
//         console.log("userId: ", userId);
//         const user = await Users.findOne({ _id: userId });
//         console.log("user: ", user);
//         localStorage.removeItem('token');
//         res.json({ status: 200, message: "Logout Successful", data: user, token: token });
//     } catch (error) {
//         console.error(error);
//         res.json({ status: 500, message: "An error occurred while processing your request" });
//     }
// };

// List of Customers //
Router.listOfCustomers = async (req, res) => {
    try {
        const customersData = await Users.find({ role: 1 });
        if (customersData) {
            res.json({ status: 200, data: customersData });
        } else {
            res.json({ status: 200, message: "No records found" });
        }
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

// List of Customers //
Router.dashboardStatistics = async (req, res) => {
    try {
        const totalSectors = await Sectors.count();
        const totalCustomers = await Customers.count();
        const totalServices = await Services.count();
        
        res.json({ status: 200, message: "Records Found", dataSectors: totalSectors, dataCustomers: totalCustomers, dataServices: totalServices });
    } catch (error) {
        res.json({ status: 500, error: 'An error occurred while retrieving the records.' });
    }
};

// Delete the Customer //
Router.deleteCustomer = async (req, res) => {
    try {
        const userID = req.params.id;
        // Step 1: Find and delete the customer
        const checkCustomer = await Users.findById(userID);
        if (!checkCustomer) {
            return res.json({ status: 400, message: "Customer not exist" });
        }

        await Users.findByIdAndRemove(userID);

        const checkUsersDelete = await Users.findById(userID);
        if (!checkUsersDelete) {
            res.json({ status: 200, message: "Customer deleted successfully" });
        }
        else {
            return res.json({ status: 400, message: "Customer not exist" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, error: 'An error occurred while deleting the customer.' });
    }
};

module.exports = Router;