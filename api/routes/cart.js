const express = require('express');
const api = express.Router();
module.exports = api
const { createCart, locateCart, addToCart, showCart, emptyCart, removeProduct, addToCartAlt } = require('./../../controllers/cartController')

// Rutas API/cart/

//Crear cart y Add New Sales Item
api.post('/', (req, res) => {
    if (!req.body.id) { // Consulto si tiene id
        createCart(req.body.id) // Creo el cart
            .then(myCart => {
                addToCart(myCart, req.body) // Agrego los products al cart
                    .then(idNewCart => res.send({ id: idNewCart })) // Devuelvo el nuevo id - a sendProduct en functions.js
            })
    } else { // Busco el cart donde ingresar el nuevo product sin generar id
        locateCart(req.body.id)
            .then(myCart => {
                addToCart(myCart, req.body)
                    .then(res.send({ task: 'complete' }))
            })
    }
})
// Borrar cart
api.delete('/:id', (req, res) => {
    emptyCart(req.params)
        .then(result => res.send({ status: result }))
})
// Obtener products
api.route('/:id/products')
    .get((req, res) => {
        showCart(req.params)
            .then(result => res.send(result.products))
            .catch(result => res.send({ error: 'no hay cart' }))
    })
    // Add New Sales Item
    .post((req, res) => {
        const { id: id_cart } = req.params
        const { id: id_prod } = req.body
        addToCartAlt(id_cart, id_prod)
            .then(result => res.send({ status: result }))
    })
// Borrar product
api.delete('/:id/products/:id_prod', (req, res) => {
    const { id, id_prod } = req.params
    removeProduct(id, id_prod)
        .then(result => res.send({ status: result }))
})

