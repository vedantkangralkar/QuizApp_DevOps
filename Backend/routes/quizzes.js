const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const Quiz = require('../models/quiz');
router.use(express.json());
const bodyParser = require("body-parser")

router.use(bodyParser.urlencoded({ extended: true }));

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Route to get all quizzes with pagination
router.get('/',auth, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const quizzes = await Quiz.find().skip((page - 1) * limit).limit(limit);
        res.json(quizzes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to get a specific quiz by ID and shuffle its questions
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

        const shuffledQuestions = shuffleArray([...quiz.questions]);
        res.json({ ...quiz.toObject(), questions: shuffledQuestions });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to create a new quiz (admin only)
router.post('/', auth, admin, async (req, res) => {
    try {
        const quiz = new Quiz({
            title: req.body.title,
            description: req.body.description,
            questions: req.body.questions,
            timer: req.body.timer,
            createdBy: req.user.id
        });

        await quiz.save();
        res.json(quiz);
    } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err.message });
    }
});

// Route to update an existing quiz by ID (admin only)
router.put('/:id', auth, admin, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
        res.json(quiz);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to delete a quiz by ID (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
        res.json({ msg: 'Quiz deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;