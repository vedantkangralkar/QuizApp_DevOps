const express = require('express'); // Import the express module
const connectDB = require('./config/db'); // Import the database connection module
const cors = require('cors'); // Import the CORS module
require('dotenv').config(); // Load environment variables from .env file

const app = express(); // Create an instance of express

connectDB(); // Connect to the database

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable parsing JSON request bodies

// Define Routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/quizzes', require('./routes/quizzes')); // Quiz routes
app.use('/api/quizzes/:quizId/results', require('./routes/results')); // Nested route for quiz results
app.use('/api/users', require('./routes/users')); // User routes

const PORT = process.env.PORT || 5000; // Define the port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); // Start the server

