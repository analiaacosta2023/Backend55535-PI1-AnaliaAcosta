import { Router } from 'express';
import CartManager from '../dao/db-managers/cartManager.js'

const cartManager = new CartManager()

const router = Router();


router.post('/', async (req, res) => {

    try {
        const result = await cartManager.addCart({});
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
})

router.get('/:cid', async (req, res) => {

    const cid = req.params.cid;

    try {
        const cart = await cartManager.getCartById(cid);
        res.send({ status: "success", payload: cart });
    } catch (error) {
        res.status(404).send({ status: 'error', message: error.message })
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    try {
        const cart = await cartManager.addProductToCart(cid, pid);
        res.send({ status: 'success', payload: cart });

    } catch (error) {
        res.status(500).send({ status: 'error', message: error.message })
    }
})


export default router;

