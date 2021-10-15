// si no esta logueado no podra acceder algunas rutas
function authMid(req, res, next) {
    if (!req.session.userLogged) {
        return res.redirect('/user/login');
    }
    next();

}

module.exports = authMid;