function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(200).json({
      message: "You are not authorized!",
      status: 401,
      isAuth: false,
      isAdmin: false,
    });
  }
}

function isAdmin(req, res, next) {
  if (req?.user?.admin) {
    next();
  } else {
    res.status(200).json({
      message: "Not admin!",
      status: 401,
      isAuth: true,
      isAdmin: false,
    });
  }
}

module.exports.isAuth = isAuth;
module.exports.isAdmin = isAdmin;
