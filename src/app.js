import express from 'express';
import __dirname from "./utils.js";
import { Server } from "socket.io";
import productsRouter from "./routes/products.js"
import cartsRouter from "./routes/carts.js"
import viewsRouter from "./routes/views.js"
import handlebars from "express-handlebars";
import mongoose from 'mongoose';
import ProductManager from './dao/db-managers/productManager.js'
import MessageManager from './dao/db-managers/messageManager.js';

const productManager = new ProductManager();
const messageManager = new MessageManager();


const app = express();
const PORT = 8080;
const connection = mongoose.connect('mongodb+srv://analiaaacosta:DQGgU5LVaHtLfJJd@clustercursobackend.bdkstux.mongodb.net/ecommerce')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars')

const server = app.listen(PORT, () => {
    console.log('Server ON')
})

// socket server
const io = new Server(server)

io.on('connection', async (socket) => {
    console.log("Nuevo cliente conectado")

    const products = await productManager.getAll();
    io.emit('products', products);

    socket.on('new-product', async data => {

        try {
            await productManager.addProduct(data.message);

            const products = await productManager.getAll();

            io.emit('products', products);

        } catch (error) {
            io.emit('error', error);
        }
    })

    socket.on('delete-product', async data => {

        try {
            await productManager.deleteProduct(data.message);

            const products = await productManager.getAll();

            io.emit('products', products);

        } catch (error) {
            io.emit('error', error.message);
        }
    })

    socket.on('message', async data => {

        try {

            await messageManager.saveMessage(data);

            const messages = await messageManager.getAll();

            io.emit('messageLogs', messages);

        } catch (error) {

            io.emit('error', error.message);
        }

    })

    socket.on('authenticated', async data => {
        socket.broadcast.emit('newUserConnected', data);
        const messages = await messageManager.getAll();

            io.emit('messageLogs', messages);
    })

})