const controllerRegister = (req, res) => {
    res.render('registerTemplate.ejs')
}

const controllerRegisterSuccess = async (req, res) => {
    res.redirect('/login')
}

const controllerRegisterError = async (req, res) => {
    res.render('error.ejs')
}

export { controllerRegister, controllerRegisterSuccess, controllerRegisterError }