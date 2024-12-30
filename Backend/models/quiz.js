const mongoose = require('mongoose');

// Define the question schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true }, // Question text
    options: { type: [String], required: true }, // Array of options
    correctAnswer: { type: String, required: true }, // Correct answer
    type: { type: String, enum: ['multiple-choice', 'true-false', 'fill-in-blank'], default: 'multiple-choice' }, // Type of question
});

// Define the quiz schema
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the quiz
    description: String, // Optional description
    questions: { type: [questionSchema], required: true }, // Array of questions
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model who created the quiz
    createdAt: { type: Date, default: Date.now }, // Date when the quiz was created
    updatedAt: { type: Date, default: Date.now }, // Date when the quiz was last updated
    timer: { type: Number, default: 0 }, // Timer for the quiz
});

// Export the Quiz model
module.exports = mongoose.model('Quiz', quizSchema);
