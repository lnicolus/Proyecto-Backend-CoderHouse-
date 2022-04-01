const products = [
  {
    "title": "FaberCastell Colors",
    "price": 150.9,
    "id": 1,
    "thumbnail": "https://cdn-icons.flaticon.com/png/512/4200/premium/4200901.png?token=exp=1648682390~hmac=3e0613cb7f3bd9149b431e6132fdea6e"
  },
  {
    "title": "Mundi Map",
    "price": 250,
    "id": 2,
    "thumbnail": "https://cdn-icons.flaticon.com/png/512/2970/premium/2970063.png?token=exp=1648682451~hmac=6284b3d0c9485f67053a46e30fd90789"
  },
  {
    "title": "Ruler",
    "price": 103.35,
    "id": 3,
    "thumbnail": "https://cdn-icons-png.flaticon.com/512/3791/3791118.png"
  }
]

export const displayProducts = () => {
  return products;
};

export const displayProductById = (id) => {  
  const index = products.findIndex(prod => prod.id === parseInt(id));  
  if (index === -1) {
      return 'Requested ID does not exist';
  }
  return products[index];
}

export const addProduct = prod => {
  const newProduct = { ...prod, id: products.length + 1 };
  products.push(newProduct);
  return `Title: ${newProduct.title}, Price: $${newProduct.price}, Thumbnail: ${newProduct.thumbnail}, ID: ${newProduct.id}`
};

/* Utilizamos el index para verificar la posicion del producto que vamos a updatear; luego realizamos tres comprobaciones
 para verificar que parametros se ingresaron para cambiar, comprobamos los tres, si se ingreso para update le reasigna el 
 valor, si no se ingreso, retornara undefined y no permitira seguir */

export const updateProductData = (id, updatedProduct) => {
  const index = products.findIndex(prod => prod.id === parseInt(id));
  if (index === -1) {
      return 'Requested ID does not exist';
  } 
  if (updatedProduct.title){products[index].title = updatedProduct.title};
  if (updatedProduct.price){products[index].price = updatedProduct.price};
  if (updatedProduct.thumbnail){products[index].thumbnail = updatedProduct.thumbnail};
  return `Updated successfully`;
}

export const deleteProductById = (id) => {
  const index = products.findIndex(prod => prod.id === parseInt(id));
  if (index === -1) {
      return 'Requested ID does not exist';
  }
  products.splice(index, 1);
  return `Product ID ${id} deleted successfully`
}