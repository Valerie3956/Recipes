const express = require('express');
const app = express();
require('dotenv').config()
const apiKey = process.env.API_KEY
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.json())
app.use(morgan('dev'))


app.use("/search", require("./routes/recipeSearchRouter"))

app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Set the port for the server to listen on
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});