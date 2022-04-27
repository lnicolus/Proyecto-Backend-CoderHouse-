(() => {
    const tempId = sessionStorage.getItem('tempId')
    fetch(`./api/products/${tempId}`)
        .then(res => res.json())
        .then(data => {
            const $product = document.getElementById('product')
            data.error === -1
                ? error(data, $product) // Muestro el error
                : showProduct(data) // Muestro el product
            storageProduct(data)
        })
})();