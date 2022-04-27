const express = require('express')
const api = express.Router()
const authentication = require('../../controllers/authController')

api.post('/', (req, res) => {
    global.userAuth = authentication(req.body.user)
    global.userAuth && res.redirect('./products.html')
})

module.exports = api