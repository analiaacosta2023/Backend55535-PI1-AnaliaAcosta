import { Router } from 'express';
import ProductManager from '../dao/db-managers/productManager.js'

const productManager = new ProductManager()

const router = Router();

router.get('/', async (req, res) => {

    const products = await productManager.getAll();

    res.render('home', {style: "index.css", products})
})

router.get('/realtimeproducts', async (req, res) => {

    res.render('realTimeProducts', {style: "index.css"})
})

router.get('/chat', async (req, res) => {

    res.render('chat', {style: "index.css"})
})


export default router;