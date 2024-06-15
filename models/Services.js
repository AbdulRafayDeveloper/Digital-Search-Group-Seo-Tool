const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    sectorId: String,
    sectorName: String,
    bussinessDiscipline: String,
    services: [String],
    dateCreated: {
        type: Date, 
        default: Date.now
    },
});

module.exports = mongoose.model("services", serviceSchema);