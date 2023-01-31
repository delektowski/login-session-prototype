const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require('cors')
const connection = require("./config/database");
const routes = require("./routes");

const MongoStore = require("connect-mongo")(session);

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000',}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: "sessions",
});

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
    res.header("Access-Control-Allow-Credentials", "true")
    next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(routes);

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(8000, (req, res) => {
    console.log(`App listening on port 8000!`);
});
