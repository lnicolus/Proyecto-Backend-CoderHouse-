
fetch('./api/products')
    .then((res) => res.json())
    .then(data => {
        // Limpio la memoria
        sessionStorage.clear()
        const $lista = document.getElementById('lista')
        // Si hay error de authentication muestro el mismo, sino la lista de products
        data.error === -1
            ? error(data, $lista)
            : productList(data, $lista)
        // Muestro el botón de Add New Sales Item si se es Admin
        data[0].auth === 1 && addProductBtn('title')
    })
    .catch(() => console.log('No elements to load'))


