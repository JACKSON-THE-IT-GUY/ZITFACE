const Zit = require('../models/Zit');

// Create a new zit
exports.createZit = async (req, res) => {
    try {
        const { content, image } = req.body;
        
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        // 1. Create the document in the database using req.user.id (from your auth middleware)
        const newZit = await Zit.create({
            user: req.user.id, 
            content,
            image: image || ''
        });

        // 2. Populate user fields cleanly on the created document instance
        const populatedZit = await newZit.populate('user', 'username profilePicture');

        res.status(201).json(populatedZit);
    } catch (error) {
        console.error('Error creating zit:', error.message);
        res.status(500).json({ message: 'Server error while creating zit' });
    }
};

// Get all posts for the timeline feed
exports.getAllZits = async (req, res) => {
    try {
        // Fetch posts and populate sender profile information
        const zits = await Zit.find()
            .populate('user', 'username profilePicture')