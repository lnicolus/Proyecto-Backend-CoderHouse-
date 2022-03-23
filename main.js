const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
    this.datos = [];
    this.id = 0;
  }

  async save(item) {
    try {
        const contenido = await fs.promises.readFile(this.archivo, 'utf8');
        const contenidoObj = JSON.parse(contenido);
        contenidoObj.push({
            titulo: item.titulo,
            precio: item.precio,
            id: contenidoObj.length + 1
        });
        await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj, null, 2));
        console.log(`El N° de ID asignado es: ${contenidoObj.length} y se guardo ${item.titulo} con precio ${item.precio}`)
    }
    catch(err) {
        console.log(err.message);
    }
}


  async getById(id) {
    
    await this.getAll();
    try {      
      let produ = this.datos.find((prod) => prod.id === id);
      if (produ) {        
        return produ;
      } else {
        return(`No existe un producto con ID ${id}!`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {      
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (contenido) {
        // No parsea sin datos         
        this.datos = JSON.parse(contenido);  
        console.log(this.datos)     
        return this.datos;
      }
    } catch (error) {
      console.log('error', error);
    }
  }

  async deleteById(id) {   
    try {
        const contenido = await fs.promises.readFile(this.archivo, 'utf8');
        const contenidoObj = JSON.parse(contenido);
        let object = contenidoObj.find(num => num.id === parseInt(id))
        // en la posicion del objeto cuyo id coincide con el pasado por parametro, eliminar un objeto, luego escribir nuevamente el objeto en el archivo sin lo eliminado
        contenidoObj.splice(contenidoObj.indexOf(object), 1)
        // le pasamos al archivo como parametros los objetos, null para que no se alteren sus propiedades, 2 para que tengan 2 espacios en blancos entre ellos para mayor legibilidad
        await fs.promises.writeFile(this.archivo, JSON.stringify(contenidoObj, null, 2));
        console.log(`Producto ${id} borrado con exito!`);
    }
    catch(err) {
        console.log(err.message);
    }
}

  async deleteAll() {
    try {
        await fs.promises.writeFile(this.archivo, JSON.stringify([], null, 2));
        console.log('Productos borrados con exito!');
        this.getAll();
    }
    catch(err) {
        console.log(err.message);
    }
}

}

module.exports = Contenedor;
// Area de prueba de comandos. Descomentar para utilizar
const container = new Contenedor('./productos.txt');

//container.getById(1);

//container.deleteById(2);

//container.deleteAll();


//container.save({"titulo": "Lapiz FaberCastell", "precio": 150.90});
//container.save({"titulo" : "Escuadra", "precio" : 103.35});
//container.save({"titulo": "Mapa Mundi", "precio": 250});

container.getAll();
