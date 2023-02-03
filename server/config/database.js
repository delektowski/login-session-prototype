const sqlite3 = require("sqlite3");
const mkdirp = require("mkdirp");

mkdirp.sync("/var/db");

const db = new sqlite3.Database("./var/db/todos.db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, username TEXT UNIQUE, hashed_password BLOB, salt BLOB)"
  );
});
