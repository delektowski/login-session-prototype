import crypto from "crypto";

export function genPassword(
  password: string
): { salt: string; hash: string } {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

export function validPassword(
  password: string,
  hash: string,
  salt: string
): boolean {
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return genHash === hash;
}
