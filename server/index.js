const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const mongoose = require('mongoose')
//Configure Mongoose to connect to mongoDB database

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});