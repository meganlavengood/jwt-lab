/**
 * tamper-demo.js — Modify a JWT and see the signature catch it
 *
 * When finished, run: node tamper-demo.js
 *
 * Expected output:
 *   - Original token verified successfully (role: user)
 *   - Tampered token decoded (shows role: admin)
 *   - Tampered token REJECTED by jwt.verify (invalid signature)
 */

const jwt = require("jsonwebtoken");

const SECRET = "lobster";

// 1. Create a normal token with role "user"
const token = jwt.sign({ userId: 42, email: "student@gmu.edu", role: "user" }, SECRET, { expiresIn: "1h" });

console.log("Original token (role: user):");
console.log(token);
console.log();

// 2. Verify the original token — should work
try {
	const decoded = jwt.verify(token, SECRET);
	console.log("✅ Original token is VALID, role:", decoded.role);
} catch (err) {
	console.log("❌ Failed:", err.message);
}

console.log();
console.log("--- Now tampering with the token ---");
console.log();

// 3. Tamper with the token: decode payload, change role to "admin", re-encode
const parts = token.split(".");

// Decode the payload (it's just Base64!)
const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

payload.role = "admin";

// Re-encode the tampered payload
const tamperedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

// Reassemble: original header + tampered payload + original signature
const tamperedToken = parts[0] + "." + tamperedPayload + "." + parts[2];

console.log("Tampered token (role changed to admin):");
console.log(tamperedToken);
console.log();

// 4. Decode the tampered token — we CAN read it (no key needed)
const decoded = jwt.decode(tamperedToken);
console.log("Decoded tampered payload:", decoded);
console.log("Role appears to be:", decoded.role);
console.log();

// 5. But VERIFY catches the tampering!
try {
	jwt.verify(tamperedToken, SECRET);
	console.log("✅ Tampered token is valid");
} catch (err) {
	console.log("❌ Tampered token REJECTED:", err.message);
	console.log("   The signature no longer matches the payload!");
}
