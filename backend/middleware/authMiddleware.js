
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
    // Check whether the JWT secret is configured
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing from .env");

        return res.status(500).json({
            message: "Server authentication is not configured."
        });
    }

    const authHeader = req.headers.authorization;

    // Check whether the request includes a Bearer token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Please log in to access this route."
        });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Please provide a valid token."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.userId = decoded.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token. Please log in again."
        });
    }
}

module.exports = verifyToken;