const express = require('express');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const Result = require('../models/result');
const Quiz = require('../models/quiz');

// Route to submit a result for a quiz
router.post('/', auth, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quizId);
        if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

        const result = new Result({ ...req.body, user: req.user.id, quiz: req.params.quizId });
        await result.save();

        const totalQuestions = quiz.questions.length;
        const answers = result.answers;
        const correctAnswers = answers.filter((question) => question.isCorrect);

        res.json({
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers.length,
            "attempted": answers.length
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to get all results for a quiz (admin only)
router.get('/', auth, admin, async (req, res) => {
    try {
        const results = await Result.find({ quiz: req.params.quizId }).populate('user', 'username');
        const quiz = await Quiz.findById(req.params.quizId);

        const formattedResults = results.map(result => {
            const totalQuestions = quiz.questions.length;
            const attemptedQuestions = result.answers.length;
            const correctAnswers = result.answers.filter(answer => answer.isCorrect).length;
            const wrongAnswers = attemptedQuestions - correctAnswers;
            const score = correctAnswers;

            // Skip results with empty values
            if (!result.user || !result.user.username || !totalQuestions || !attemptedQuestions ) {
                return null;
            }

            return {
                user: result.user.username,
                totalQuestions: totalQuestions,
                attemptedQuestions: attemptedQuestions,
                correctAnswers: correctAnswers,
                score: score
            };
        }).filter(result => result !== null); // Filter out null results

        // Sort results in decreasing order of score
        formattedResults.sort((a, b) => b.score - a.score);

        res.json(formattedResults);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to get a specific result by ID
router.get('/:id', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({ msg: 'Result not found' });
        }
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
