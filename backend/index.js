const express = require('express')
var cors = require('cors')
const mongoose = require('mongoose');
const userRoutes = require('./routes/index')
require('dotenv').config();
const app = express()
// const bodyParser = require('body-parser')
const port = 5000

// const uri = `mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/mmGarments?retryWrites=true&w=majority&appName=Cluster0`

// app.use(cors(
//   {
//     origin:["https://mm-traders-app-frontend.vercel.app",
//             "http://localhost:3000",
//             "http://localhost:5000"
//           ],
//     methods:["POST","GET"],
//     credentials:true
//   }
// ));
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://mm-traders-app-frontend.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://mm-traders-app-frontend.vercel.app'); // Replace '*' with your allowed origin
//   res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept',
//   );
//   next();
// })
app.use(express.json())
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello developers from GFG",
  });
});
// app.use(bodyParser.json())
app.use("/api", userRoutes)
console.log('process.env.MONGO_URI===>', process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((client) => {
  console.log('Database Connected')

}).catch((err) => {
  console.log('Err===>', err)
});

// app.listen(port,  () => {
// console.log(`Example app listening on port ${port}`)
// })