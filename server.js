const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const Container = require('./src/Container');
const ChatHistory = require('./src/ChatHistory');
const myRoutes = require('./src/Routes');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);


const productContainer = new Container();
const history = new ChatHistory();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(myRoutes);


app.set('view engine', 'ejs');
app.set('views','./public/views');

const messages = [];

io.on('connection', async (socket) => {
    console.log("New user online");    
    
    socket.emit('products', productContainer.getAll());

    socket.on('saveNewProduct', (newProduct) => {
        productContainer.save(newProduct);
        io.sockets.emit('products', productContainer.getAll())
    });
     
    socket.emit('messages', messages);
   
   const message = await history.displayMessage()
   socket.emit('messages', message )
  
   socket.on('newMessages', async data => {
       await history.saveMessage(data)
       let displayTheMessage = await history.displayMessage()
       io.sockets.emit('messages', displayTheMessage );
   });

});

const PORT = 8080 
httpServer.listen(PORT, () => console.log('Servidor online in http://localhost:8080'))