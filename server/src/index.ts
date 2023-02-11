import express, { NextFunction, Request, Response } from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import routes from "./routes";
import * as dotenv from "dotenv";
import cookieParser from 'cookie-parser';

// Need to require the entire Passport config module so app.js knows about it
import "./config/passport";

dotenv.config();

const SQLiteStore = require("connect-sqlite3")(session);
/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * -------------- SESSION SETUP ----------------
 */

const sessionStore = new SQLiteStore({ db: "sessions.db", dir: "./var/db" });

app.use(
  session({
    secret: process.env.SECRET || "",
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

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/app.js
app.use(routes);

app.listen(8000,'127.0.0.1', () => {
  console.log(`App listening on port 8000!`);
});
