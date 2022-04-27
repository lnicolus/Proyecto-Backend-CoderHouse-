//#  ID cart
const idCart = localStorage.getItem('myIdCart')

// Total de cart
const reduce = (products, $subtotal, $impuesto, $envio, $total) => {
    let subtotal = products.map(prod => prod.price * prod.quantity).reduce((subtotal, prod) => subtotal += prod)
    $subtotal.innerText = `$${subtotal}`
    let impuesto = subtotal * 0.21
    $impuesto.innerText = `$${impuesto.toFixed(2)}`
    let envio = 0
    $envio.innerText = `$${envio}`
    let total = subtotal + impuesto + envio
    $total.innerText = `$${total.toFixed(2)}`
}
// Mostrar products
const showProducts = (products, container) => {

    let display = document.createElement('div')
    display.innerHTML = products.map(prod => `
                <div class="flex pb-4 border-neutral-20 border-b-2">
                    <div class="md:w-4/12 2xl:w-1/4 w-full">
                        <img src=${prod.thumbnail} alt="Black Leather Bag" class="w-full h-full object-center object-cover" />
                    </div>
                    <div class="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                        <p id="code" class="text-xs leading-3 text-gray-800 dark:text-white md:pt-0 pt-4">${prod.code}</p>
                        <div class="flex items-center justify-between w-full pt-1">
                            <p id="name" class="text-base font-black leading-none text-gray-800 dark:text-white my-4">
                                ${prod.name}
                            </p>
                        </div>
                        <p id="stock" class="text-xs leading-3 text-gray-600 dark:text-white pt-2">Stock: ${prod.stock}
                        </p>
                        <p id="stock" class="text-xs leading-3 text-gray-600 dark:text-white pt-2">price por unidad: $${prod.price}
                        </p>
                        <p id="quantity" class="text-xs leading-3 text-gray-600 dark:text-white py-4">Compra: ${prod.quantity}
                        </p>
                        <p id="description" class="w-96 text-xs leading-3 text-gray-600 dark:text-white">description:
                            ${prod.description}
                        </p>
                        <div class="flex items-center justify-between pt-5">
                            <div class="flex itemms-center">
                                <p id="add" onclick="add('${prod.id}')"
                                    class="text-xs leading-3 underline text-gray-800 dark:text-white cursor-pointer">
                                    Agregar</p>
                                <p id="remove" onclick="remove('${prod.id}')" class="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer">
                                    Remover</p>
                            </div>
                            <p id="price" class="text-base font-black leading-none text-gray-800 dark:text-white">
                                $${prod.price * prod.quantity}</p>
                        </div>
                    </div>
                </div>
    `).join('')
    container.append(display)
}
// Mostrar error
const showError = (container, id) => {
    let error = document.createElement('div')
    error.innerHTML = `
            <div class="flex flex-col items-center w-full">
                <b>Error: -1 </b>
                <b>Route: ./api/cart/${id}/products</b>
                <b>Method: 'GET'</b>
                <b>Descripción: 'No autorizado'</b>
            </div>`
    container.append(error)
}
// Comprar - Vaciar cart y borrarlo
const checkout = document.getElementById('checkout')
checkout.onclick = () => {
    fetch(`./api/cart/${idCart}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('myIdCart')
            location.href = './success.html'
        })
}
//Remover product
const remove = (id) => {
    fetch(`./api/cart/${idCart}/products/${id}`, {
        method: 'DELETE'
    })
        .then(res => res.json())
        .then(() => location.href = './cart.html')
}
//Add New Sales Item
const add = (id) => {
    fetch(`./api/cart/${idCart}/products`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
    })
        .then(res => res.json())
        .then(() => location.href = './cart.html')
}
