import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password || password.length < 12) {
  console.error("Provide a password of at least 12 characters.");
  process.exit(1);
}
const salt = randomBytes(16).toString("base64");
const hash = scryptSync(password, salt, 64).toString("base64");
console.log(`scrypt:${salt}:${hash}`);
