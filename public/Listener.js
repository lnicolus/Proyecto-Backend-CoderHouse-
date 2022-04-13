window.onload = () => {
    const socket = io();

    socket.on('products', listProd => {
        loadProds(listProd);
    });

    socket.on('messages', data => {
        displayMessages(data)
    });

    async function loadProds(listProd) {
        let htmlProd = '';
        let tableList = await fetch('views/partials/table.ejs').then(res => res.text())
 
        if (listProd.length === 0){
            htmlProd = `The list is empty`
        }else{
            htmlProd = ejs.render(tableList, {listProd})
             
        }
        //renderiza los productos en el div que esta por default vacio en el index
        document.getElementById('laidTable').innerHTML = htmlProd;
         
    }

    function displayMessages(data) {
        const html = data.map((elem) => {
            return(`<div class="chat-info">
                         <span id="chatName" class="chat-name pull-right">${elem.email}</span>
                        <span id= "chatDate" class="timestamp pull-left">${elem.date}</span>
                    </div>
                         <div id="chatText" class="chat-text">${elem.text}</div>
                     `)
        }).join(" ");
        document.getElementById('messages').innerHTML = html;
    }
 
    document.getElementById('save').addEventListener('click', () => {
        let newProduct = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value
        };
        socket.emit('saveNewProduct', newProduct);
    });

    document.getElementById('Messager').addEventListener('submit', (e) => {
        e.preventDefault();
        appendMessage();
    });

    function appendMessage(){
        let newMessage = {
            email: document.getElementById('email').value,
            text: document.getElementById('text').value
        };
        socket.emit('newMessages', newMessage);
    }

};

