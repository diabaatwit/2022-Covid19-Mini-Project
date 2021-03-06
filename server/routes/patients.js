const express = require('express')
const router = express.Router()

const cors = require('cors')


//Give write access to server
const whitelist = ["http://localhost:3000", "https://covid19-reporting-web-app.herokuapp.com"]
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
router.use(cors(corsOptions))

// get patient schema from ../models/patient
const Patient = require('../models/patient')



// Getting all patients
router.get('/', async (req, res) => {
  try {
    // get all patients, and retrieve it in json format.
    const patients = await Patient.find()
    res.header("Access-Control-Allow-Origin", "*")
    res.json(patients)

  }
  catch (err) {
    // if error, display error 500
    res.status(500).json({ message: err.message })
  }
})

// getting one patient
router.get('/:id', getPatient, (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.json(res.patient)
})


// adding a patient
router.post('/', async (req, res) => {
  const patient = new Patient({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    sex: req.body.sex,
    BMI: req.body.BMI
  })
  try {
    // add the patient
    const newPatient = await patient.save()
    console.log(newPatient)
    res.status(201).json(newPatient)
  } catch (err) {
    // if error, display error 400
    res.status(400).json({ message: err.message })
  }
})




// Updating a patient.
router.patch('/:id', getPatient, async (req, res) => {

  // if name in the request body is not null, which means we want to update this name,
  // then update name, and same with all other attributes.
  if (req.body.name != null) {
    res.patient[0].name = req.body.name
  }
  if (req.body.age != null) {
    res.patient[0].age = req.body.age
  }
  if (req.body.email != null) {
    res.patient[0].email = req.body.email
  }
  if (req.body.phoneNumber != null) {
    res.patient[0].phoneNumber = req.body.phoneNumber
  }
  if (req.body.address != null) {
    res.patient[0].address = req.body.address
  }
  if (req.body.city != null) {
    res.patient[0].city = req.body.city
  }
  if (req.body.state != null) {
    res.patient[0].state = req.body.state
  }
  if (req.body.zipCode != null) {
    res.patient[0].zipCode = req.body.zipCode
  }
  if (req.body.sex != null) {
    res.patient[0].sex = req.body.sex
  }
  if (req.body.BMI != null) {
    res.patient[0].BMI = req.body.BMI
  }
  try {
    const updatedPatient = await res.patient[0].save()
    res.header("Access-Control-Allow-Origin", "*")
    res.json(updatedPatient)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// deleting a patient
router.delete('/:id', getPatient, async (req, res) => {
  try {
    // delete patient with this id.
    await res.patient[0].remove()
    res.json({ message: 'Patient deleted' })
  } catch (err) {
    // if error, display error 500
    res.status(500).json({ message: err.message })
  }
})


// getting a specific patient by id
async function getPatient(req, res, next) {
  let patient = []
  try {
    // get patient by id.
    patient[0] = await Patient.findById(req.params.id)
    // if there is no patient with this id, display cannot find patient.
    if (patient == null) {
      return res.status(404).json({ message: 'Cannot find patient' })
    }
  } catch (err) {
    // if error, display error 500
    return res.status(500).json({ message: err.message })
  }

  res.patient = patient
  next()
}

module.exports = router