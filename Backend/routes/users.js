const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Result = require('../models/result');

// Route to get results for a specific user
router.get('/:userId/results', auth, async (req, res) => {
    try {
        // Only allow access to own results or if the user is an admin
        if (req.user.id !== req.params.userId && !req.user.isAdmin) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }
        const results = await Result.find({ user: req.params.userId }).populate('quiz', 'title');
        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
