const passport = require("passport");
const LocalStrategy = require("passport-local");
const validPassword = require("../lib/passwordUtils").validPassword;
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./var/db/todos.db");

const customFields = {
  usernameField: "uname",
  passwordField: "pw",
};

const verifyCallback = (username, password, done) => {
  db.get(
    "SELECT * FROM users WHERE username =?",
    [username],
    function (err, row) {
      if (err) {
        return done(err);
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  db.get("SELECT * FROM users WHERE id =?", [userId], function () {
    done(null, userId);
  });
});
