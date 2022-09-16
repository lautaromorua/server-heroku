import { contenedorMongoCart } from '../containers/contenedorMongo.js';
import logger from '../utils/logger.js';

const getNewCart = async (req, res) => {
    try {
        const response = await contenedorMongoCart.createDocument();
        res.send(`Carrito Creado con el ID ${response._id}`)
    } catch (e) {
        logger.error('Ocurrio un error al crear el carrito', e);
        res.sendStatus(500)
    }
};

const getCartProducts = async (req, res) => {
    try {
        const idCart = req.params.id
        const response = await contenedorMongoCart.getById(idCart);
        res.send(response)
    } catch (e) {
        logger.error("Ocurrio un error al obtener los productos del carrito:", e);
        res.sendStatus(500)
    }
};

const addProductACart = async (req, res) => {
    try {
        const cartID = req.params.id
        const productbody = req.body

        const response = await contenedorMongoCart.updateDocument(cartID, productbody);
        res.send(response)
    } catch (e) {
        logger.error('Ocurrio un error al agregar el producto al carrito', e);
        res.sendStatus(500)
    }
};

const deleteCart = async (req, res) => {
    try {
        const cartID = req.params.id
        const response = await contenedorMongoCart.deleteById(cartID);
        if (!response) {
            res.send("El id de carrito no existe");
        } else {
            res.send(response);
        }
    } catch (error) {
        logger.error("Ocurrio un error al querer eliminar el carrito", error);
        res.sendStatus(500);
    }
};

const deleteById = async (req, res) => {
    try {
        const cartID = req.params.id
        const productID = req.params.id_prod
        const response = await contenedorMongoCart.deleteProductInCart(cartID, productID);
        res.send(response)
    } catch (e) {
        logger.error('Ocurrio un error al eliminar el producto  del carrito', e);
        res.sendStatus(500)
    }
};

export {
    getNewCart,
    getCartProducts,
    deleteCart,
    addProductACart,
    deleteById
};