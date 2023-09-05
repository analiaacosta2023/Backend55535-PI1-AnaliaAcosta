import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartProductSchema = new mongoose.Schema({
    productId: String,
    quantity: {
        type: Number,
        default: 1,
    },
})

const cartSchema = new mongoose.Schema({

    products: {
        type: [cartProductSchema],
        default: [],
    }

})

export const cartModel = mongoose.model(cartsCollection, cartSchema);