const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.archivo, "utf-8");
      if (!contenido) {
        const productos = [];
        fs.writeFileSync(this.archivo, JSON.stringify(productos));
        return productos;
      }
      const datos = JSON.parse(contenido);
      return datos;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((err) => {
          throw err;
        });
      if (array.length <= 0) {
        return null;
      }
      for (let i = 0; i < array.length; i++) {
        if (array[i].id === id) {
          console.log(array[i])
          return array[i];
        }
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async save(objeto) {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length <= 0) {
        objeto.id = 1;
        array.push(objeto);
        let datos = JSON.stringify(array);
        fs.writeFileSync(this.archivo, datos, "utf-8");
        return objeto.id;
      }
      objeto.id = array.length + 1;
      array.push(obj);
      let datos = JSON.stringify(array);
      fs.writeFileSync(this.archivo, datos, "utf-8");
      return objeto.id;
    } catch (error) {
      throw error;
    }
  }

  async deleteAll() {
    try {
      const array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        fs.writeFileSync(this.archivo, JSON.stringify([]));
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      let array = await this.getAll()
        .then((res) => res)
        .catch((error) => {
          throw error;
        });
      if (array.length >= 1) {
        array = array.filter((objeto) => {
          return objeto.id !== id;
        });
        // reordeno los ids de los objetos del array para que reflejen su posicion en la lista
        for (let i = 0; i < array.length; i++) {
          if (array[i].id > id) {
            array[i].id -= 1;
          }
        }
        fs.writeFileSync(this.archivo, JSON.stringify(array), "utf-8");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Contenedor;