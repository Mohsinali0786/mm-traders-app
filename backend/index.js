const express = require('express')
var cors = require('cors')
const userRoutes = require('./routes/index')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const port = 5000
require('dotenv').config();

const uri = `mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/mmGarments?retryWrites=true&w=majority&appName=Cluster0`




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