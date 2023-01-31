const crypto = require("crypto");

function genPassword(password, user) {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

function validPassword(password, hash, salt) {
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return genHash === hash;
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
