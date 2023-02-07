import { Database } from "sqlite3";
import mkdirp from "mkdirp";

const db = new Database("./var/db/users.db");

mkdirp.sync("/var/db");

db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users ( id INTEGER PRIMARY KEY, username TEXT UNIQUE, hashed_password BLOB, salt BLOB)"
  );
});
