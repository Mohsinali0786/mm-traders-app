const {app} = require('.')
const mongoDB = require('./config/db')
console.log(app,'app')
port=5000

app.listen(port, async () => {
    // await mongoDB()
    console.log(`Example app listening on port ${port}`)
  })
