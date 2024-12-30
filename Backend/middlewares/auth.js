const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    let token = req.header('x-auth-token'); // Get token from header

    // Check if token is in cookies if not found in header
    if (!token && req.cookies) {
        token = req.cookies.token;
    }

    // console.log('Token:', token); // Log the token for debugging

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // Return 401 if no token
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user to request object
        next(); // Proceed to next middleware
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' }); // Return 401 if token is invalid
    }
};
