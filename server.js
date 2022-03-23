const Contenedor = require("./contenedor");
const express = require("express");
const app = express();

let productos = new Contenedor("./productos.txt");

app.get('/productos', (req, res) => {
  (async () => {
    await productos.getAll().then((resolve) => {
      res.send(resolve);
    });
  })();
});

app.get('/', (req, res) => {
  (async () => {
    await productos.getAll().then((resolve) => {
      res.send(resolve);
    });
  })();
});

app.get('/productoRandom', (req, res) => {
  (async () => {
    let lista = await productos.getAll().then((res) => res);
    if(lista.length === 0) {
      res.status().send('No hay productos');
    }
    else {
      res.send(lista[Math.floor(Math.random() * lista.length)]);
    }
  })();
});

let PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));