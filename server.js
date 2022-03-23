const Contenedor = require("./main.js");

const express = require("express");

const appExpress = express();

let PORT = 3000;

const server = appExpress.listen(PORT, () => {
    console.log(`Servidor Http escuchando en el puerto ${server.address().port}`)
});

const contenedor1 = new Contenedor("productos.txt");

appExpress.get("/productos", async (req, res) => {
  const datos = await contenedor1.getAll();
  res.send(datos);
});

appExpress.get("/productosRandom", async (req, res) => {
  const datos = await contenedor1.getAll();
  let num = Math.floor(Math.random() * datos.length + 1);
  const dato = await contenedor1.getById(num);
  res.send(dato);
});
