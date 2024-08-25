const express = require('express')
var cors = require('cors')
const mongoDB=require('./config/db')
const userRoutes = require('./routes/index')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
require('dotenv').config();
const mongoose = require('mongoose');

app.use(cors(
  {
    origin:"https://mm-traders-app-frontend.vercel.app",
    methods:["POST","GET"],
    credentials:true
  }
));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://mm-traders-app-frontend.vercel.app'); // Replace '*' with your allowed origin
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
})

app.listen(port, async () => {
  // await mongoDB()
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((client) => {
      console.log('Database Connected')

    }).catch((err) => {
      console.log('Err===>', err)
    });
  console.log(`Example app listening on port ${port}`)
})


app.use(bodyParser.json())
app.use("/api", userRoutes)

module.exports ={app}