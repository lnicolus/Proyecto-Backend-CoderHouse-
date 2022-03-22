const fs = require('fs');

class Contenedor {
    constructor (nombre){
        this.nombre = nombre
    }

    // utilizo async save() un metodo que obtuve de https://www.geeksforgeeks.org/p5-js-save-function/
    async save(item) {
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf8');
            const contenidoObj = JSON.parse(contenido);
            contenidoObj.push({
                titulo: item.titulo,
                precio: item.precio,
                id: contenidoObj.length + 1
            });
            await fs.promises.writeFile(this.nombre, JSON.stringify(contenidoObj, null, 2));
            console.log(`El N° de ID asignado es: ${contenidoObj.length}`)
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async getById(numero) {
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf8');
            const contenidoObj = JSON.parse(contenido);
            const getId = contenidoObj.find(num=> num.id === parseInt(numero));
            if (getId != undefined) {
                console.log(getId)
            } else {
                console.log('El id seleccionado no fue creado aun')
            }
             
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf8');
            const contenidoObj = JSON.parse(contenido);
            console.log(contenidoObj);  
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async deleteById(id) {
        try {
            const contenido = await fs.promises.readFile(this.nombre, 'utf8');
            const contenidoObj = JSON.parse(contenido);
            let object = contenidoObj.find(num => num.id === parseInt(id))
            // en la posicion del objeto cuyo id coincide con el pasado por parametro, eliminar un objeto, luego escribir nuevamente el objeto en el archivo sin lo eliminado
            contenidoObj.splice(contenidoObj.indexOf(object), 1)
            // le pasamos al archivo como parametros los objetos, null para que no se alteren sus propiedades, 2 para que tengan 2 espacios en blancos entre ellos para mayor legibilidad
            await fs.promises.writeFile(this.nombre, JSON.stringify(contenidoObj, null, 2));
            console.log(`Producto ${id} borrado con exito!`);
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.nombre, JSON.stringify([], null, 2));
            console.log('Productos borrados con exito!');
            this.getAll();
        }
        catch(err) {
            console.log(err.message);
        }
    }

}

const productos = new Contenedor ('./productos.txt');

//console.log(productos.save({"titulo": "Lapiz FaberCastell", "precio": 150.90}));
//console.log(productos.save({"titulo" : "Escuadra", "precio" : 103.35}));
//console.log(productos.save({"titulo": "Mapa Mundi", "precio": 250}));

//productos.getById(2);

//productos.getAll();

// Borramos el Mapa Mundi
//productos.deleteById(2)

// Dejamos un array de objetos vacio, getAll nos muestra que efectivamente se borro
//productos.deleteAll();







// libreria llamada Random en npmjs.com donde muestran las librerias y funciones que querramos desarrollar
// npm init -y crea un JSON con datos del proyecto, si no le ponemos y te pide que ingreses datos del proyecto y te crea el package JSON
// en JSON scripts tengo que poner "start" : "node main.js" para que yo pueda poner npm start y sepa por donde iniciar
// tambien puedo poner newScript para iniciar otro script y modificar dependencias
// npm install --save random me instala la dependencia de las funciones de random, bajandolas de la net. El dia que exporto el proyecto en el package JSON ya sabe que dependencias tiene
// es para no tener que pasar los node modules, para que no sea muy pesado, asi la persona que sigue instala las librerias que necesita
/*
const random = require('random'); // requerimos libreria Random

let numbers = new Map();

for (let index = 0; index < 10000; index++) {

    let randomNum = random.int(1,20); // random.int es una funcion especifica que esta en documentacion devuelve dos integer entre un minimo y un maximo, este caso 1 y 20

    if(numbers.has(randomNum)) {
        numbers.set(randomNum, numbers.get(randomNum)+1) // valida algo en esa clave, si hay algo le suma uno
    } else {
        numbers.set(randomNum, 1); // le asigna uno si el numero no salio, el objetivo del ejercicio es que diga cuantas veces salio cada numero
    }
}

*/
/*
console.log(numbers)
// ejercicios clase 5
const productos = [
    { id:1, nombre:'Escuadra', precio:323.45 },
    { id:2, nombre:'Calculadora', precio:234.56 },
    { id:3, nombre:'Globo Terráqueo', precio:45.67 },
    { id:4, nombre:'Paleta Pintura', precio:456.78 },
    { id:5, nombre:'Reloj', precio:67.89 },
    { id:6, nombre:'Agenda', precio:78.90 }
]

let nombreProductos ='';
let precioTotal = 0;

productos.forEach(producto => {
    nombreProductos = nombreProductos + ',' + producto.nombre;
    precioTotal += producto.precio;
});

let precioPromedio = precioTotal / productos.length;

const maximo = Math.max(...productos.map(prod => prod.precio), 0);
let mayorPrecio = productos.filter(prod => prod.precio == maximo);
const minimo = Math.min(...productos.map(prod => prod.precio), 0);
let menorPrecio = productos.filter(prod => prod.precio == minimo);

let valores = {
    nombres: nombreProductos,
    total: precioTotal,
    promedio: precioPromedio,
    menorPrecio: menorPrecio,
    mayorPrecio: mayorPrecio,
}

console.log(valores)
console.log(valores.total)

// hacer lo de moment viendo el video
//"moment" : "~2.29.1" solo cambia con el patch
//"random" : "˄3.0.6" 

import moment from 'moment';

let fecha1 = moment('1992-12-10').format('dddd'); // hay distintas formas de sacarlo, solo saca el dia de nacimiento
// hay un metodo de relative time que permite saber desde hace cuanto
let cuantoViviste = moment('1992-12-10').fromNow(); // cuantos anios desde que naciste
console.log(fecha)
console.log(cuantoViviste)
let fecha2 = moment('2022-03-15')

console.log(fecha2.diff(fecha1, 'days'),' dias de diferencia')
console.log(`Hoy es ${fecha1.format('L')}`)
console.log(`Naci el ${fecha2.format('L')}`)
console.log(`Desde mi nacimiento han pasado ${fecha1.diff(fecha2, 'days')} dias`)
console.log(`Desde mi nacimiento han pasado ${fecha1.diff(fecha2, 'years')} años`) 

import random from 'random';

let numbers = new Map();

for (let index = 0; index < 10000; index++) {

    let randomNum = random.int(1, 20);
  
  if(numbers.has(randomNum)){
    numbers.set(randomNum, numbers.get(randomNum)+1);
  }else{
    numbers.set(randomNum, 1);
  }
}

console.log(numbers);


const fs = require('fs');

async function readFile(){
    try {
        const contenido = await fs.promises.readFile('./info.txt', 'utf-8');
        const infoData = JSON.parse(contenido).contenidoObj;
        const info = {
            name: infoData.name,
            version: infoData.version,
            description: infoData.description,
            main: infoData.main,
            scripts: infoData.scripts,
            keywords: infoData.keywords,
            author: infoData.author,
            license: infoData.license
        }

        console.log(info);
        info.author = 'CoderHouse';
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

readFile();

const fs = require('fs');

const date = new Date();

console.log(date.toLocaleDateString());
console.log(date.toLocaleTimeString());

console.log(`Fecha: ${date.toLocaleDateString()} Hora: ${date.toLocaleTimeString()}`)

const fs = require('fs');

let packData;

const packageData = fs.readFile('./package.json', 'utf-8', (error, contenido) =>{
    if(error){
        throw new Error('Error leyendo package')
    }else{
    
        const info = {
            contenidoStr: contenido,
            contenidoObj: JSON.parse(contenido),
            size: '2 Kb'
        }

        console.log(JSON.stringify(info,null,2));
        fs.writeFile('./info.txt', JSON.stringify(info), error => {
            if(error){
                 throw new Error('Error escribiendo info.txt')
            }else{
                console.log('Guardado en info.txt')
            }
        })
    }
})

// function mostrarLista(lista){
//     if(lista.length > 0){
// for (let index = 0; index < lista.length; index++) {
//     console.log(lista[index]);
// }
//     }else{
// console.log('Lista vacia');
//     }
// } 

// let array1 = [];
// let array2 = [1,'arara',3,'pepe'];

// mostrarLista(array1);
// mostrarLista(array2);

// let array3 = [1,8,9];

// (function(lista){
//     if(lista.length > 0){
//         for (let index = 0; index < lista.length; index++) {
//             console.log(lista[index]);
            
//         }
//         }else{
//             console.log('lista vacia')
//         }
// })(array3);


// function crearMultiplicador(num){
// return function(num2){
// return num*num2;
// }
// }

// console.log(crearMultiplicador(3)(2));
// console.log(crearMultiplicador(5)(8));

class Contador {
    constructor(nombre){
        this.nombre = nombre;
        this.contador = 0;
    }
    static cont = 0;

 obtenerResponsable(){
 return this.nombre;
 }

 obtenerCuentaIndividual(){
 return this.contador;
 }

 obtenerCuentaGlobal(){
  return Contador.cont;
 }
 contar(){
   this.contador++;
   Contador.cont++;
 }

}

let contador1 = new Contador('perrito');
console.log(contador1);
let contador2 = new Contador('gatito');
contador1.contar(); // contador1 = 1 && cont = 1
contador1.contar(); // contador1 = 2 && cont = 2
contador1.contar(); // contador1 = 3 && cont = 3
contador2.contar(); // contador1 = 3 && contador2 = 1 && cont = 4
contador2.contar(); // contador1 = 3 && contador2 = 2 && cont = 5

console.log(contador1.obtenerCuentaIndividual()); // 3
console.log(contador1.obtenerCuentaGlobal()); // 5

console.log(contador2);

// const fs = require('fs');

// const data = fs.readFileSync('./archivo.txt', 'utf-8');

// console.log(data);

// fs.appendFileSync('./archivo.txt','prueba realizada 2')

// const data1 = fs.readFileSync('./archivo.txt', 'utf-8');

// console.log(data1);


// try {
//     const data = fs.readFileSync('/ruta/no');
// } catch (error) {
//     console.log(error);
// }

// fs.appendFile('./archivo.txt','Texto nuevo\n', error => {
//     if(error){
//        console.log(error);
//     }else{
//        console.log('Todo ok');
//     }
// } )

// fs.readFile('./archivo.txt', 'utf-8', (error, contenido) => {
//     if(error){
//         console.log(error);
//     }else{
//         console.log(contenido)
//     }
// })

// fs.mkdir('./nuevaCarpeta', error => {
//     if(error){
// console.log(error)
//     }else{
//         console.log('Carpeta creada')
//     }
// })

// Ejercicio asincronismo y callback

const mostrarLetras = (palabra, intervalo) => {     
    for (let index = 0; index < palabra.length; index++) {
        setTimeout(() => console.log(palabra.charAt(index)), intervalo*index )
    }

}

mostrarLetras('texto',2000);*/
