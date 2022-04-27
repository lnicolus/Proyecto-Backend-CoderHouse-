const router = function (express, app) {

    const products = require('./routes/products')
    const cart = require('./routes/cart')
    const auth = require('./routes/authentication')

    app.use('/api/products', products)
    app.use('/api/cart', cart)
    app.use('/auth', auth)

}
module.exports = router