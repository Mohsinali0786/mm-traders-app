const { app } = require('.')
console.log(app, 'app')
const uri = `mongodb+srv://mohsin00786:mohsin00786@cluster0.9pujbap.mongodb.net/mmGarments?retryWrites=true&w=majority&appName=Cluster0`

port = 5000
const mongoose = require('mongoose');

app.listen(port, async () => {
  // await mongoDB()
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((client) => {
      console.log('Database Connected')

    }).catch((err) => {
      console.log('Err===>', err)
    });
  console.log(`Example app listening on port ${port}`)
})
