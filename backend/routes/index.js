const express = require('express')
const routes = express.Router()

// routes.use(require('./get'))
routes.use(require('./add'))
routes.use(require('./get'))


module.exports = routes