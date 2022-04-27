// Carga de cart
const fs = require('fs')
const cartPath = './public/cart.json'
// Carga de elementos a incluir
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')


// Crear el cart
class Cart {
    constructor(product) {
        this.id = uuidv4()
        this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss:SSSSSS (MMMM dddd Do)')
        this.products = []
    }
}

// Testeo existencia del cart y lo Creo
const createCart = async (id) => {
    try {
        const cartList = await fs.promises.readFile(cartPath, 'utf-8')
            .then(res => JSON.parse(res))
        // Compruebo la inexistencia de nuevo para asegurarme de crearlo
        if (!cartList.some(prod => id === prod.id)) {
            const myCart = new Cart()
            let newList = [...cartList, myCart]
            await fs.promises.writeFile(cartPath, JSON.stringify(newList, null, 2))
            return myCart // Envío el nuevo carro como MyCart
        }
    }
    catch {
        return ('no se encuentra la db')
    }
}

const locateCart = async (id) => {
    const cartList = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // Busco el cart en la db
    const myCart = cartList.find(cart => cart.id === id)
    return myCart
}

// Add New Sales Item
const addToCart = async function (cart, product) {

    let modProduct = await cart.products.find(prod => prod.id === product.product.id)
    if (modProduct) { modProduct.quantity += product.product.quantity }
    else { cart.products = [...cart.products, product.product] }
    // Cargo el cart
    const myNewCart = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // Creo el cart temporal
    let tempCart = myNewCart.filter(cart => cart.id !== cart.id)
    //Inserto el product alterado nuevamente
    tempCart = [...tempCart, cart]
    //Grabo el cart modificado
    fs.promises.writeFile(cartPath, JSON.stringify(tempCart, null, 2))
    return cart.id
}

const showCart = async (id) => {
    const carts = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    let myCart = carts.find(cart => cart.id === id.id)
    return myCart
}

const emptyCart = async (id) => {
    const cartList = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    const tempList = cartList.filter(cart => cart.id !== id.id)
    await fs.promises.writeFile(cartPath, JSON.stringify(tempList, null, 2))
    return 'deleted'
}

const removeProduct = async (id, id_prod) => {
    const tempCartsList = await fs.promises.readFile(cartPath)
        .then(res => JSON.parse(res))
    const tempCart = tempCartsList.find(cart => cart.id === id)
    if (tempCart.products.some(prod => prod.id === id_prod)) {
        const tempProductList = tempCart.products.filter(prod => prod.id !== id_prod)
        tempCart.products = tempProductList // TempCart = products modificados
        let newCartsList = tempCartsList.filter(cart => cart.id !== tempCart.id)
        newCartsList = [...newCartsList, tempCart]
        await fs.promises.writeFile(cartPath, JSON.stringify(newCartsList, null, 2))
        return 'removed'
    }
}

const addToCartAlt = async (idcart, idprod) => {
    // Archivo cargado
    const tempFile = await fs.promises.readFile(cartPath, 'utf-8')
        .then(res => JSON.parse(res))
    // cart seleccionado
    let tempCart = tempFile.find(cart => cart.id === idcart)
    // product modificado
    let tempProduct = tempCart.products.find(prod => prod.id === idprod)
    tempProduct.quantity++
    // Preparo el archivo modificado
    let newFile = tempFile.filter(cart => cart.id !== idcart)
    newFile = [...newFile, tempCart]
    //Guardo el archivo modificado
    fs.promises.writeFile(cartPath, JSON.stringify(newFile, null, 2))
    return 'added'
}


module.exports = { createCart, locateCart, addToCart, showCart, emptyCart, removeProduct, addToCartAlt, Cart }