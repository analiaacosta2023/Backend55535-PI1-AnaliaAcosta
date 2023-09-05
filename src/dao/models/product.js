import mongoose from 'mongoose';

const productsCollection = 'products';

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: [String],
        default: [],
    },
    // Matias usa type: Array
    status: {
        type: Boolean,
        default: true,
    }

})

export const productModel = mongoose.model(productsCollection, productSchema);