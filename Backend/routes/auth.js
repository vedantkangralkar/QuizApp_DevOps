const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Route to register a new user
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        if (await User.findOne({ username })) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, isAdmin: role });
        await user.save();

        const token = jwt.sign({ user: { id: user.id, isAdmin: user.isAdmin } }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ user: { id: user.id, isAdmin: user.isAdmin } }, process.env.JWT_SECRET);
        res.json({"token": token,"role":user.isAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
