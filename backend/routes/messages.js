// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth'); // Assumes your bearer token middleware

//  GET: Fetch all messages for a specific conversation channel
router.get('/:conversationId', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId })
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to load chat history" });
  }
});

//  POST: Send a new message string
router.post('/', authMiddleware, async (req, res) => {
  const { conversationId, recipientId, text } = req.body;
  if (!text.trim()) return res.status(400).json({ error: "Empty messages not allowed" });

  try {
    const newMessage = new Message({
      conversationId,
      sender: req.user.id, // Derived from your auth token payload
      recipient: recipientId,
      text: text.trim()
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: "Failed to route message" });
  }
});

module.exports = router;