const products = [
    {
      "title": "Lapices FaberCastell",
      "price": 150.90,
      "id": 1,
      "thumbnail": "https://cdn-icons-png.flaticon.com/512/5434/5434492.png"
    },
    {
      "title": "Mapa Mundi",
      "price": 250,
      "id": 2,
      "thumbnail": "https://cdn-icons-png.flaticon.com/512/1243/1243420.png"
    },
    {
      "title": "Escuadra",
      "price": 103.35,
      "id": 3,
      "thumbnail": "https://cdn-icons-png.flaticon.com/512/3791/3791118.png"
    }
  ]

export const getProducts = () => {
    return products;
};

export const getProduct = (id) => {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
        return 'id inexistente';
    }
    return products[index];
}

export const addProduct = product => {
    const newProduct = { ...product, id: products.length + 1 };
    products.push(newProduct);
    return `${newProduct.title} agregado exitosamente, price $${newProduct.price}, ID ${newProduct.id}`
};

export const updateProduct = (id, newProduct) => {
    const index = products.findIndex(prod => prod.id === parseInt(id));
    if (index === -1) {
        return 'no existe el id buscado';
    }
    if (newProduct.title){products[index].title = newProduct.title};
    if (newProduct.price){products[index].price = newProduct.price};
    if (newProduct.thumbnail){products[index].thumbnail = newProduct.thumbnail};
    return `El producto ${newProduct.title} actualizado con éxito`;
}

export const deleteProduct = (id) => {
    const index = products.findIndex(product => product.id === parseInt(id));
    if (index === -1) {
        return 'id inexistente';
    }
    products.splice(index, 1);
    return `Producto ID ${id} eliminado`
}
