const { app } = require('.')
console.log(app, 'app')
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
