import { contenedorMongoProd } from "../containers/contenedorMongo.js"

const controllerLogin = async (req, res) => {
    if (req.isAuthenticated()) {
        console.log('Usuario ya logueado')
        res.redirect('/productos/all')
    } else {
        console.log('Por favor, ingresa sus credenciales')
        await res.render('loginTemplate.ejs')
    }
}

const controllerLoginSucces = async (req, res) => {
    req.session.user = req.body.username
    //res.redirect('/productos')
    const productos = await contenedorMongoProd.getAll()
    res.render('listaProductos.ejs', { productos, username: req.session.username })
}

const controllerLogout = (req, res) => {
    req.session.destroy()
    res.render('cerrarSesion.ejs', { username: req.session })
}

const controllerLoginError = async (req, res) => {
    await res.render('errorLogin.ejs')
}

export { controllerLogin, controllerLogout, controllerLoginSucces, controllerLoginError };