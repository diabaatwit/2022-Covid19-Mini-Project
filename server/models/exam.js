const mongoose = require('mongoose')


// patient schema that will help us connecting to the db.
const examSchema = new mongoose.Schema({

    numHours: {
        type: Number,
        required: true
    },
    xRayImageLink: {
        type: String,
        required: true
    },
    keyFindings: {
        type: String,
        required: true
    },
    brixiaScores: {
        type: Array,
        required: true
    },
    patientID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('exams', examSchema)