const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const routes = require("./routes");

const SQLiteStore = require("connect-sqlite3")(session);

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new SQLiteStore({ db: "sessions.db", dir: "./var/db" });

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

app.listen(8000, () => {
  console.log(`App listening on port 8000!`);
});
