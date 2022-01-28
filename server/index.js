const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require('mongoose')
<<<<<<< HEAD

const url = 'mongodb+srv://nocturnals:AeT3RFlq38I3BXWp@cluster0.fqifx.mongodb.net/examResultsDB?retryWrites=true&w=majority'

mongoose.connect(url).then(e => {
  console.log('connected');
}).catch(e =>{
  console.error('not connected', e.error);
});



=======
//Configure Mongoose to connect to mongoDB database
>>>>>>> 9ca346fc7ded3e63a238af6f439685c832f44b10

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});