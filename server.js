const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require("cors");
const bodyParser = require("body-parser");
const users = require("./routes/userRoutes");
const sectorRoutes = require("./routes/sectorRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const customersRoutes = require("./routes/customersRoutes");
const connectionString=process.env.CONNECTION_STRING;
const MongoUrl = connectionString;

const app = express();
const port = 4000;

// Database Connection
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error occurred in db connection");
});
db.once("open", () => {
  console.log("Connected");
});

// Enable CORS for all routes
app.use(cors());

app.use(express.static(__dirname + "/public"));

// Parse incoming requests with urlencoded and json bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Run Route Files APIs

app.use("/user", users);
app.use("/sector", sectorRoutes);
app.use("/service", servicesRoutes);
app.use("/customer", customersRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});