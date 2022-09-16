import { Router } from 'express';
import infoRoute from './infoRoute.js'
import randomRoute from './randomRoute.js'
const router = Router()
import passport from "passport";
import checkAdmin from '../middleware/checkAuth.js'
import { getNewCart, addProductACart, deleteCart, getCartProducts, deleteById } from '../controllers/controllerCarrito.js'
import { getAllProducts, getById, postProduct, updateProduct, deleteProdById } from '../controllers/controllerProductos.js';
import { controllerLogin, controllerLoginError, controllerLogout, controllerLoginSucces } from '../controllers/controllerLogin.js'
import { controllerRegister, controllerRegisterError, controllerRegisterSuccess } from '../controllers/controllerRegister.js'

router.use('/info', infoRoute)
router.use('/randoms', randomRoute)

//rutas register
router.get('/register', controllerRegister)
router.post('/register', passport.authenticate("register", { failureRedirect: '/registerError' }), controllerRegisterSuccess)
router.get('/registerError', controllerRegisterError)

//rutas login
router.get('/login', controllerLogin)
router.post('/login', passport.authenticate("login", { failureRedirect: '/loginError' }), controllerLoginSucces)
router.get('/logout', checkAdmin, controllerLogout)
router.get('/loginError', controllerLoginError)


//rutas productos
router.get('/productos', checkAdmin, getAllProducts)
router.get('/productos/:id', checkAdmin, getById)
router.post('/productos', checkAdmin, postProduct)
router.put('/:id', checkAdmin, updateProduct)
router.delete('/:id', checkAdmin, deleteProdById)

//rutas carritos
router.get('/carts', getNewCart);
router.get('/carts/:id/productos', getCartProducts);
router.post('/carts/:id/productos', addProductACart);
router.delete('/carts/:id', deleteCart);
router.delete('/carts/:id/productos/:id_prod', deleteById);
router.put('/:id/productos', getCartProducts);

export default router;
