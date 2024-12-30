const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Username must be unique and required
    password: { type: String, required: true }, // Password is required
    isAdmin: { type: String, default: "false" }, // This field stores whether the user is an admin or not
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
