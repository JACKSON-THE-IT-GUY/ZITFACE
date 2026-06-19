const mongoose = require('mongoose');

const zitSchema = new mongoose.Schema({
  // Links the Zit to the User who posted it using their unique MongoDB ID
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // The text content of the Zit (limited to 280 characters like a tweet)
  content: {
    type: String,
    required: [true, 'Zit content cannot be empty'],
    maxlength: [280, 'Zit content cannot exceed 280 characters'],
    trim: true
  },
  // String URL path pointing to an uploaded image file (optional)
  image: {
    type: String,
    default: null
  },
  // Array of User IDs who have liked this post (prevents duplicate likes)
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  // Embedded array of comments for fast, structured retrieval
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      username: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: [true, 'Comment text cannot be empty']
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Zit = mongoose.model('Zit', zitSchema);

module.exports = Zit;