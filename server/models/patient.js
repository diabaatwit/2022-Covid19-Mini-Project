const mongoose = require('mongoose')


// patient schema that will help us connecting to the db.
const patientSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    BMI: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('patients', patientSchema)