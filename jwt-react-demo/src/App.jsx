import { useState } from "react";
import "./App.css";

// ============================================
// FAKE AUTH — simulates what a server does
// In a real app, this runs on the server side
// ============================================

// Hardcoded users (in real apps, this is a database)
const USERS = [
	{ id: 1, email: "admin@test.com", password: "admin123", role: "admin" },
	{ id: 2, email: "user@test.com", password: "user123", role: "user" },
];

// Simple JWT-like token (Base64 encoded JSON — NOT secure for production!)
// This is just to show the concept. Real JWTs use crypto signatures.
function createToken(user) {
	const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
	const payload = btoa(
		JSON.stringify({
			userId: user.id,
			email: user.email,
			role: user.role,
			exp: Date.now() + 60 * 60 * 1000, // 1 hour from now
		}),
	);
	const signature = btoa("fake-signature");
	return `${header}.${payload}.${signature}`;
}

function decodeToken(token) {
	try {
		const payload = JSON.parse(atob(token.split(".")[1]));
		if (payload.exp < Date.now()) return null; // expired
		return payload;
	} catch {
		return null;
	}
}

function fakeLogin(email, password) {
	const user = USERS.find((u) => u.email === email && u.password === password);
	if (!user) return { error: "Invalid email or password" };
	return { token: createToken(user) };
}

// ============================================
// REACT APP
// ============================================

function App() {
	const [token, setToken] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const user = token ? decodeToken(token) : null;

	const handleLogin = (e) => {
		e.preventDefault();
		setError(null);
		const result = fakeLogin(email, password);
		if (result.error) {
			setError(result.error);
		} else {
			setToken(result.token);
			setEmail("");
			setPassword("");
		}
	};

	const handleLogout = () => {
		setToken(null);
	};

	// Not logged in — show login form
	if (!user) {
		return (
			<div className="app">
				<h1>JWT Auth Demo</h1>
				<p>Sign in to see protected content</p>
				{error && <p style={{ color: "#ef4444" }}>{error}</p>}
				<form onSubmit={handleLogin}>
					<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<button type="submit">Sign In</button>
				</form>
				<p style={{ marginTop: "1rem", color: "#9ca3af", fontSize: "0.9rem" }}>Test accounts: admin@test.com / admin123 or user@test.com / user123</p>
			</div>
		);
	}

	// Logged in — show protected content
	return (
		<div className="app">
			<h1>JWT Auth Demo</h1>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
				<p>
					Signed in as: <strong>{user.email}</strong> (role: {user.role})
				</p>
				<button onClick={handleLogout}>Sign Out</button>
			</div>

			<h2>🔒 Protected Content</h2>
			<p>This content is only visible when you have a valid JWT.</p>

			{user.role === "admin" && (
				<div style={{ background: "#1a1a2e", padding: "1rem", borderRadius: "8px", marginTop: "1rem" }}>
					<h3>👑 Admin Panel</h3>
					<p>Only admins can see this section.</p>
				</div>
			)}

			<h2 style={{ marginTop: "2rem" }}>📋 Your Token (raw)</h2>
			<pre style={{ background: "#0d1117", padding: "1rem", borderRadius: "8px", fontSize: "0.75rem", wordBreak: "break-all", whiteSpace: "pre-wrap" }}>{token}</pre>

			<h2 style={{ marginTop: "1rem" }}>📋 Decoded Payload</h2>
			<pre style={{ background: "#0d1117", padding: "1rem", borderRadius: "8px", fontSize: "0.85rem" }}>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}

export default App;
