const Zit = require('../models/Zit');

// Create a new zit
exports.createZit = async (req, res) => {
    try {
        const { content, image } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        if (!req.user?.id) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const newZit = await Zit.create({
            user: req.user.id,
            content,
            image: image || ''
        });

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
        const zits = await Zit.find()
            .populate('user', 'username profilePicture')
            .sort({ createdAt: -1 });

        res.status(200).json(zits);
    } catch (error) {
        console.error('Error fetching zits:', error.message);
        res.status(500).json({ message: 'Server error while fetching zits' });
    }
};