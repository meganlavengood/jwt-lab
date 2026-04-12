# IT 431 — JWT Fundamentals Lab

Starter project for Module 8, Assignment 1.

## Getting Started

```bash
npm install
```

## Scripts

Each file has TODO comments — follow the assignment instructions to complete them.

| File              | Run Command            | What It Does                                 |
| ----------------- | ---------------------- | -------------------------------------------- |
| `sign-token.js`   | `node sign-token.js`   | Create and inspect a JWT                     |
| `verify-token.js` | `node verify-token.js` | Verify tokens with correct/wrong secrets     |
| `expire-demo.js`  | `node expire-demo.js`  | Watch a token expire in real time            |
| `tamper-demo.js`  | `node tamper-demo.js`  | Modify a token and see verification catch it |

## Security Questions

Answer the 5 questions in `answers.md` after completing the scripts.

## React Demo

The React JWT demo is a separate step — see the assignment instructions for setup.

## Notes from instructions

What is jsonwebtoken? It's the most popular JWT library for Node.js with over 18 million weekly downloads on npm. It handles creating (signing), verifying, and decoding JWTs. This is the same library that many auth systems use under the hood. It's already listed in package.json — npm install pulls it in.
