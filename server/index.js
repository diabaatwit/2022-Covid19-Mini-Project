const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express()

const mongoose = require('mongoose')

// database url.
const url = 'mongodb+srv://nocturnals:AeT3RFlq38I3BXWp@cluster0.fqifx.mongodb.net/examResultsDB?retryWrites=true&w=majority'

// connecting to the database
mongoose.connect(url, { useNewUrlParser: true})

// check if the connection was successful or no
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))


// telling the app that we'll use json
app.use(express.json())

// use patient router in http://localhost:3001/patients
const patientsRouter = require('./routes/patients')
app.use('/patients', patientsRouter)

// use exam router in http://localhost:3001/exams
const examsRouter = require('./routes/exams')
app.use('/exams', examsRouter)


app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

if(process.env.NODE_ENV === 'production') {
  // serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  //handle react routing, return all requests to react app
  app.get('*', function(req, res){
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// server listening on port 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});