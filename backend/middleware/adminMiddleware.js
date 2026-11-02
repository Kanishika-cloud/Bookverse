
const User = require("../models/user");

async function verifyAdmin(req, res, next) {
    try {
        // Find the logged-in user using the ID
        // added by verifyToken middleware
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(401).json({
                message: "User not found. Please log in again."
            });
        }

        // Check whether the user has the admin role
        if (user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admins only."
            });
        }

        // Allow the request to continue
        next();

    } catch (error) {
        console.error("Admin verification error:", error.message);

        return res.status(500).json({
            message: "Could not verify admin permissions."
        });
    }
}

module.exports = verifyAdmin;