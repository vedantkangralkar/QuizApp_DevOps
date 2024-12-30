const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using URI from environment variables
        console.log('MongoDB Connected...'); // Log success message
    } catch (err) {
        console.error(err.message); // Log error message
        process.exit(1); // Exit process with failure
    }
};

// Export the connectDB function
module.exports = connectDB;
