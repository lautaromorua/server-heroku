//import { ProductDao } from "../daos/index.js";
import { contenedorMongoProd } from "../containers/contenedorMongo.js";
import logger from "../utils/logger.js";

const getAllProducts = async (req, res) => {
    try {
        //const { username } = req.user
        const productos = await contenedorMongoProd.getAll()

        res.render('listaProductos.ejs', { productos, username: req.session.user })
    } catch (error) {
        logger.error('Error al obtener los productos', error)
        res.sendStatus(500);
    }
};

const getById = async (req, res) => {
    try {
        // const response = await ProductDao.getById(req.params.id);
        // if (!response) {
        //     return res.send('El ID del producto no existe')
        // } else {
        //     return res.send(response)
        // }
        const { id } = req.params.id
        const { username } = req.user

        const productos = await contenedorMongoProd.getById(id)

        res.render('listaProductos.ejs', { username, productos })
    } catch (error) {
        logger.error('Ocurrio un error al obtener el producto de la DB', error)
        res.sendStatus(500)
    }
}

const postProduct = async (req, res) => {
    try {
        await contenedorMongoProd.createDocument(req.body)
        const productos = await contenedorMongoProd.getAll()

        res.render('listaProductos.ejs', { productos })
    } catch (error) {
        logger.error('Ocurrio un error al guardar el producto', error)
        res.redirect('/productos/all')
    }
}


const updateProduct = async (req, res) => {
    try {
        const response = await contenedorMongoProd.updateDocument(req.params.id, req.body);
        if (!response) {
            logger.error('El ID del producto no existe')
        } else {
            return res.send(200)
        }
    } catch (error) {
        logger.error('Ocurrio un error al actualizar el producto')
        res.sendStatus(500)
    }
}

const deleteProdById = async (req, res) => {
    try {
        const response = await contenedorMongoProd.deleteById(req.params.id);
        if (!response) {
            return res.send('El ID del producto no existe')
        } else {
            res.send(200)
        }
    } catch (error) {
        logger.error('Ocurrio un error al eliminar el producto')
        res.sendStatus(500)
    }
}

export {
    getAllProducts,
    getById,
    postProduct,
    updateProduct,
    deleteProdById
};