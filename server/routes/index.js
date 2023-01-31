const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const connection = require("../config/database");
const User = connection.models.User;
const { isAuth, isAdmin } = require("./authMiddleware");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "login-success",
    failureRedirect: "/login-failure",
  })
);

router.post("/register", (req, res, next) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = new User({
    username: req.body.uname,
    hash,
    salt,
    admin: true,
  });

  newUser
    .save()
    .then((user) => {
      res.send({
        message: `You successfully registered a user: ${user.username}`,
        status: 200,
        isRegistered: true,
      });
    })
    .catch((err) => {
      console.log("Register error:", err);
      res.send({
        message: `Something went wrong.`,
        status: 500,
        isRegistered: false,
      });
    });
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send({
    message: "You are authenticated",
    status: 200,
    isAuth: true,
    isAdmin: false,
  });
});

router.get("/login-success", (req, res, next) => {
  res.send({
    message: "You successfully logged in",
    status: 200,
    isAuth: true,
    isAdmin: false,
  });
});

router.get("/login-failure", (req, res, next) => {
  res.send({
    message: "Something went wrong.",
    status: 401,
    isAuth: false,
    isAdmin: false,
  });
});

module.exports = router;
