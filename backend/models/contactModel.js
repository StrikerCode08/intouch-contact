const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  "emailAddress": {
    type: String,
    required: [true, "Please provide a email"],
    validate: [validator.isEmail, "please enter a valid email"],
  },
  "relatedName": {
    type: String,
  },
  "homeAddress2": {
    type: String,
  },
  anniversary: {
    type: String,
  },
  "firstName": {
    type: String,
  },
  "businessAddress2": {
    type: String,
  },
  department: {
    type: String,
  },
  "displayName": {
    type: String,
  },
  "homeState": {
    type: String,
  },
  "businessCountry": {
    type: String,
  },
  "homeStreet": {
    type: String,
  },
  birthday: {
    type: String,
  },
  "homeCountry": {
    type: String,
  },
  pager: {
    type: String,
  },
  categories: {
    type: String,
  },
  "homeCity": {
    type: String,
  },
  "email3Address": {
    type: String,
  },
  "homeFax": {
    type: String,
  },
  gender: {
    type: String,
  },
  notes: {
    type: String,
  },
  "Country Code": {
    type: String,
  },
  "jobTitle": {
    type: String,
  },
  "businessAddress": {
    type: String,
  },
  "webPage2": {
    type: String,
  },
  "mobilePhone": {
    type: String,
  },
  organization: {
    type: String,
  },
  "homePhone": {
    type: String,
  },
  "email2Address": {
    type: String,
  },
  "lastName": {
    type: String,
  },
  nickname: {
    type: String,
  },
  "businessFax": {
    type: String,
  },
  "homePostalCode": {
    type: String,
  },
  "businessPhone": {
    type: String,
  },
  "businessPostalCode": {
    type: String,
  },
  "webPage": {
    type: String,
  },
  "businessCity": {
    type: String,
  },
  "businessState": {
    type: String,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
