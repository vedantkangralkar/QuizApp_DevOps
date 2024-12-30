const mongoose = require('mongoose');

// Define the result schema
const resultSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true }, // Reference to the Quiz model
    score: Number, // Score obtained by the user
    answers: [{ questionIndex: Number, selectedAnswer: String, isCorrect: Boolean }], // Array of answers with details
    timeRemaining: Number, // Store remaining time
    date: { type: Date, default: Date.now }, // Date when the result was created
});

// Export the Result model
module.exports = mongoose.model('Result', resultSchema);
