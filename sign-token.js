/**
 * sign-token.js — Create and inspect a JWT
 * When finished, run: node sign-token.js
 *
 * Expected output:
 *   - The full JWT string
 *   - The three parts (header, payload, signature) separated
 *   - The decoded payload showing your claims + iat/exp
 */

const jwt = require("jsonwebtoken");

// 1. Define a secret key (any string — in production this would be in an env variable)
const SECRET = "lobster";

// 2. Create a payload object with: userId (number), email (string), role (string)
const payload = {
	userId: 42,
	email: "student@gmu.edu",
	role: "user",
};

// 3. Sign the token with jwt.sign(payload, secret, options)
//    Use { expiresIn: '1h' } as the options
const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });

console.log("=== JWT Created ===");
console.log("Token:", token);
console.log();

// 4. Split the token by '.' to show the three parts
const parts = token.split(".");

console.log("Header (Base64):", parts[0]);
console.log("Payload (Base64):", parts[1]);
console.log("Signature:", parts[2]);
console.log();

// 5. Decode the payload from Base64 to show it's readable
const decodedPayload = JSON.parse(Buffer.from(parts[1], "base64").toString());

console.log("Decoded Payload:", decodedPayload);
