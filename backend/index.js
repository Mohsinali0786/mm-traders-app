const express = require('express')
var cors = require('cors')
const mongoDB=require('./db')
const userRoutes = require('./routes/index')
const app = express()
const port = 5000
mongoDB()
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace '*' with your allowed origin
  res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
})
app.use(cors(
  {
    origin:"https://mm-traders-app-frontend.vercel.app",
    methods:["POST","GET"],
    credentials:true
  }
));
app.use("/api", userRoutes)
// app.use("/api",require("./routes/loginUser"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})