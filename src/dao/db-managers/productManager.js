import { productModel } from '../models/product.js'

class ProductManager {

    constructor() {
    }

    getAll = async () => {

        const products = await productModel.find()
        return products.map(product => product.toObject());
    }

    addProduct = async (product) => {

        try {
            const result = await productModel.create(product);
            return result
        } catch (error) {
            throw error
        }
    }

    getProductById = async (idProducto) => {

        try {
            const result = await productModel.findById(idProducto);
            return result
        } catch (error) {
            throw error
        }
    }

    updateProduct = async (idProducto, propertiesToUpdate) => {

        try {
            const result = await productModel.findByIdAndUpdate(
                idProducto,
                propertiesToUpdate,
                { new: true }
            );
            return result;
        } catch (error) {
            throw error
        }
    }


    deleteProduct = async (idProducto) => {
        try {
            const result = await productModel.findByIdAndDelete(idProducto);
            return result;
        } catch (error) {
            throw error
        }
    }

}

export default ProductManager;

