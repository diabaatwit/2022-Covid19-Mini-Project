const express = require('express')
const router = express.Router()

// get exam schema from ../models/exam
const Exam = require('../models/exam')

// Getting all exams
router.get('/', async (req, res) => {
    try {
        // get all exams, and retrieve it in json format.
        const exams = await Exam.find()
        res.header("Access-Control-Allow-Origin", "*")
        res.json(exams)
    }
    catch (err) {
        // if error, display error 500
        res.status(500).json({ message: err.message})
    }
})

// getting one exam
router.get('/:id', getExam, (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.json(res.exam)
})


// adding an exam
router.post('/', async (req, res) => {
    const exam = new Exam({
      numHours: req.body.numHours,
      xRayImageLink: req.body.xRayImageLink,
      keyFindings: req.body.keyFindings,
      brixiaScores: req.body.brixiaScores,
      patientID: req.body.patientID
    })
    try {
        // add the exam
        const newExam = await exam.save()
        console.log(newExam)
        res.status(201).json(newExam)
    } catch (err) {
        // if error, display error 400
        res.status(400).json({ message: err.message })
    }
})


// Updating an exam
router.patch('/:id', getExam, async (req, res) => {

    // if numHours in the request body is not null, which means we want to update it,
    // then update numHours, and same with all other attributes.
    if (req.body.numHours != null) {
      res.exam.numHours = req.body.numHours
    }
    if (req.body.xRayImageLink != null) {
      res.exam.xRayImageLink = req.body.xRayImageLink
    }
    if (req.body.keyFindings != null) {
      res.exam.keyFindings = req.body.keyFindings
    }
    if (req.body.brixiaScores != null) {
        res.exam.brixiaScores = req.body.brixiaScores
    }
    if (req.body.patientID != null) {
        res.exam.patientID = req.body.patientID
    }
    try {
      const updatedExam = await res.exam.save()
      res.header("Access-Control-Allow-Origin", "*")
      res.json(updatedExam)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // deleting an exam
  router.delete('/:id', getExam, async (req, res) => {
    try {
      // delete exam with this id.
      await res.exam.remove()
      res.header("Access-Control-Allow-Origin", "*")
      res.json({ message: 'Exam deleted' })
    } catch (err) {
      // if error, display error 500
      res.status(500).json({ message: err.message })
    }
  })
  

  // getting a specific exam by id
  async function getExam(req, res, next) {
    let exam
    try {
      // get exam by id.
      exam = await Exam.findById(req.params.id)
      // if there is no exam with this id, display cannot find exam.
      if (exam == null) {
        return res.status(404).json({ message: 'Cannot find exam' })
      }
    } catch (err) {
      // if error, display error 500
      return res.status(500).json({ message: err.message })
    }
  
    res.exam = exam
    next()
  }

module.exports = router