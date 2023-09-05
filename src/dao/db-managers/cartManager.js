import { cartModel } from "../models/cart.js";
import { productModel } from "../models/product.js";

class CartManager {

    constructor() {
    }

    getAll = async () => {

        const carts = await cartModel.find()
        return carts.map(cart => cart.toObject());
    }

    addCart = async (cart) => {

        try {
            const result = await cartModel.create(cart);
            return result
        } catch (error) {
            throw error
        }
    }

    getCartById = async (idCart) => {

        try {
            const result = await cartModel.findById(idCart);
            return result
        } catch (error) {
            throw error
        }
    }

    addProductToCart = async (idCart, idProduct) => {
        try {
            const product = await productModel.findById(idProduct);
            const cart = await cartModel.findById(idCart);

            const existingProductIndex = cart.products.findIndex(product => product.productId == idProduct)

            if (existingProductIndex >= 0) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({
                    productId: product._id
                })
            }

            const result = await cartModel.findByIdAndUpdate(
                idCart,
                cart,
                { new: true }
            );
            return result;
        } catch (error) {
            throw error
        }
    }

}

export default CartManager;