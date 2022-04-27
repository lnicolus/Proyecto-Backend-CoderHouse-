const cartId = localStorage.getItem('myIdCart')
const $container = document.getElementById('products-container')
const $subtotal = document.getElementById('subtotal')
const $impuesto = document.getElementById('impuesto')
const $envio = document.getElementById('envio')
const $total = document.getElementById('total')
//Obtener products


fetch(`./api/cart/${cartId}/products`)
    .then(res => res.json())
    .then(data => {
        if (localStorage.getItem('user')) {
            showProducts(data, $container)
            reduce(data, $subtotal, $impuesto, $envio, $total)
        } else {
            showError($container, cartId)
        }
    })

