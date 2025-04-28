const jwt = require("jsonwebtoken");

// Use your env secret or fallback secret
const JWT_SECRET = process.env.JWT_SECRET || "yoursecretkey";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "7d", // you can adjust the expiry as needed
  });
};

module.exports = generateToken;
