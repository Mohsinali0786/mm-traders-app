const { app } = require('.')
const mongoDB = require('./config/db')
console.log(app, 'app')
port = 5000
const mongoose = require('mongoose');

app.listen(port, async () => {
  // await mongoDB()
  const mongoDB = async () => {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((client) => {
      console.log('Database Connected')

    }).catch((err) => {
      console.log('Err===>', err)
    });
  }



  console.log(`Example app listening on port ${port}`)
})
