import express from "express";
import passport from "passport";
import {Database} from "sqlite3";
import {isAuth} from "./authMiddleware";
import {genPassword} from "../lib/passwordUtils"

const router = express.Router();
const db = new Database("./var/db/users.db");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "login-success",
    failureRedirect: "/login-failure",
  })
);

router.post("/register", (req, res) => {
  const saltHash = genPassword(req.body.pw);

  const salt = saltHash.salt;
  const hash = saltHash.hash;

  db.run(
    "INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)",
    [req.body.uname, hash, salt],
    () => {
      res.send({
        message: `You successfully registered a user: ${req.body.uname}`,
        status: 200,
        isRegistered: true,
      });
    }
  );
});

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.send({
      message: "You successfully logged out",
      status: 200,
      isAuth: false,
      isAdmin: false,
    });
  });
});

router.get("/protected-route", isAuth, (req, res) => {
  res.send({
    message: "You are authenticated",
    status: 200,
    isAuth: true,
    isAdmin: false,
  });
});

router.get("/login-success", (req, res) => {

  res.send({
    message: "You successfully logged in",
    status: 200,
    isAuth: true,
    isAdmin: false,
  });
});

router.get("/login-failure", (req, res) => {
  res.send({
    message: "Something went wrong.",
    status: 401,
    isAuth: false,
    isAdmin: false,
  });
});

export default router;
