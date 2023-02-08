import passport from "passport";
import { validPassword } from "../lib/passwordUtils";
import { Database } from "sqlite3";

import { Strategy as LocalStrategy } from "passport-local"
const db = new Database("./var/db/users.db");

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (
  username: string,
  password: string,
  done: (arg0: Error | null, arg1: boolean | undefined) => void
) => {
  db.get(
    "SELECT * FROM users WHERE username =?",
    [username],
    function (err, row) {
      if (err) {
        return done(err, false);
      }
      if (!row) {
        return done(null, false);
      }
      const isValid = validPassword(password, row.hashed_password, row.salt);
      if (isValid) {
        done(null, row);
      } else {
        return done(null, false);
      }
    }
  );
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user: unknown, done) => {
  done(null, (user as { id: string }).id);
});

passport.deserializeUser((userId, done) => {
  db.get("SELECT * FROM users WHERE id =?", [userId], function () {
    done(null, userId as string);
  });
});
