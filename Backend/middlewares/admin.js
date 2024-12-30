module.exports = (req, res, next) => {
    // console.log(req.user);
    if (!req.user.isAdmin) { // Check if user is admin
        return res.status(403).json({ msg: 'Unauthorized, admin access only' }); // Return 403 if not admin
    }
    next(); // Proceed to next middleware
};
