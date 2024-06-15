const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sectorSchema = new Schema({
    name: String,
    bussinessDisciplines: [String],
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("sectors", sectorSchema);