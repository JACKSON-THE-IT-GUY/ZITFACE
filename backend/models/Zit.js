const mongoose = require('mongoose');

const ZitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Must match your User model name exactly
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    default: ''
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, { timestamps: true }); // Automatically handles createdAt and updatedAt for sorting

module.exports = mongoose.model('Zit', ZitSchema);