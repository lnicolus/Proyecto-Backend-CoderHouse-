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

app.get('/productoRandom', (req, res) => {
  (async () => {
    let lista = await productos.getAll().then((res) => res);
    if(lista.length === 0) {
      res.send(res.status, 'Sin productos');
    }
    else {
      res.send(array[Math.floor(Math.random() * array.length)]);
    }
  })();
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Servidor Express escuchando peticiones en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));