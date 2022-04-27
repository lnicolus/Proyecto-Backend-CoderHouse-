function validation(data) {

    if (typeof data.code === 'string') { data.code = Number(data.code) }
    if (typeof data.price === 'string') { data.price = Number(data.price) }
    if (typeof data.stock === 'string') { data.stock = Number(data.stock) }

    return data
}
module.exports = validation