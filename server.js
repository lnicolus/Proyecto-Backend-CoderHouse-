
const express = require('express')
const app = express()
global.pathRoot = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))


global.userAuth = 0


const router = require('./api/api')
router(express, app)


const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Server active at - http://localhost:${PORT}`)
})
server.on('error', error => console.log('ha habido un error: ', error))

