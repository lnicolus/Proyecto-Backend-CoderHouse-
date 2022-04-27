const fs = require('fs')

module.exports = class Products {

    constructor(archivo) {
        this.getAll = async function () {
            try {
                const products = await fs.promises.readFile(archivo, 'utf-8')
                    .then(temp => JSON.parse(temp))
                return products
            }
            catch (error) {
                throw new Error('No se ha podido encontrar/leer/interpretar la DB')
            }
        }

        this.getById = async function (idFind) {
            try {
                const product = await fs.promises.readFile(archivo, 'utf-8')
                    .then(temp => JSON.parse(temp))
                let getProduct = product.find(prod => prod.id === idFind)
                return getProduct
            }
            catch (error) {
                { throw new Error('No se ha podido encontrar/leer/interpretar la DB') }
            }
        }

        this.addProduct = async function (newProduct) {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                    .then(temp => JSON.parse(temp))
                if (!tempFile.some(prod => prod.id === newProduct.id)) {
                    let newList = [...tempFile, newProduct]
                    fs.promises.writeFile(archivo, JSON.stringify(newList, null, 2))
                    return 'ok'
                } else {
                    return ({ error: 'product ya existente' })
                }
            }
            catch (error) {
                throw new Error('No se ha podido procesar la operacion')
            }
        }

        this.modifyProduct = async function (product) {
            try {
                const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                    .then(result => JSON.parse(result))
                let found = tempFile.find(prod => prod.id === product.id)
                found.name = product.name
                found.description = product.description
                found.code = product.code
                found.price = product.price
                found.stock = product.stock
                found.thumbnail = product.thumbnail

                let newList = tempFile.filter(prod => prod.id !== product.id)
                newList = [...newList, found]
                fs.promises.writeFile(archivo, JSON.stringify(newList, null, 2))
                return 'ok'
            }
            catch (error) {
                throw new Error('No se ha podido procesar la operacion')
            }
        }

        this.deleteProduct = async function (product) {
            const tempFile = await fs.promises.readFile(archivo, 'utf-8')
                .then((result) => JSON.parse(result))
            const newList = tempFile.filter(prod => prod.id !== product.id)
            fs.promises.writeFile(archivo, JSON.stringify(newList, null, 2))
            return 'ok'
        }

    }
}