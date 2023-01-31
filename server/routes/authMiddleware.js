function isAuth(req, res, next)  {
    if(req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({msg: "You are not authorized!"})
    }
}

function isAdmin(req, res, next) {
    if(req?.user?.admin) {
        next()
    } else {
        res.status(401).json({msg: 'Not admin!'})
    }
}

module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;
