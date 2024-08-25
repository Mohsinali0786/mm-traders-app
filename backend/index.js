const express = require('express')
var cors = require('cors')
const mongoDB=require('./config/db')
const userRoutes = require('./routes/index')
const app = express()
const bodyParser = require('body-parser')
const port = 5000
require('dotenv').config();

app.use(cors(
  {
    // origin:"https://mm-traders-app-frontend.vercel.app",
    // methods:["POST","GET"],
    // credentials:true
  }
));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://mm-traders-app-frontend.vercel.app'); // Replace '*' with your allowed origin
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// })

app.use(bodyParser.json())
app.use("/api", userRoutes)

module.exports ={app}