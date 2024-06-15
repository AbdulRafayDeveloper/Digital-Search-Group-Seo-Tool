const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const keywordSchema = new Schema({
    keyword: String,
    location: String,
    link: String,
  });

const customerSchema = new Schema({
    sector: String,
    bussinessDiscipline: String,
    services: [String],
    customerName: String,
    customerEmail: String,
    website: String,
    country: String,
    state: String,
    radius: String,
    zipCode: String,
    dateCreated: {
        type: Date, 
        default: Date.now
    },
    keywords: [keywordSchema]
});

module.exports = mongoose.model("customers", customerSchema);