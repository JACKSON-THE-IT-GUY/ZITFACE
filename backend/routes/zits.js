const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// Double check the spelling of zitController:
const { createZit, getAllZits } = require('../controllers/zitController'); 

router.post('/', auth, createZit);
router.get('/', auth, getAllZits);
// GET /api/search?q=query
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Search query is empty" });

        // Case-insensitive regex pattern matching
        const searchRegex = new RegExp(q, 'i');

        // 1. Search for matching users
        const users = await User.find({
            $or: [{ username: searchRegex }, { email: searchRegex }]
        }).select('username email profilePicture').limit(5);

        // 2. Search for matching posts ("zits")
        const posts = await Post.find({
            $or: [{ content: searchRegex }, { caption: searchRegex }]
        }).populate('user', 'username profilePicture').limit(10);

        res.status(200).json({ users, posts });
    } catch (error) {
        res.status(500).json({ message: "Search transaction failed", error: error.message });
    }
});

module.exports = router; // Essential line