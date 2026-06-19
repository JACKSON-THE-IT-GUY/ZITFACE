const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  avatarLetter: {
    type: String,
    // If an explicit avatar letter isn't provided, default to the first letter of their username
    default: function() {
      return this.username ? this.username[0].toUpperCase() : 'J';
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the operational model from our schema layout
const User = mongoose.model('User', userSchema);

module.exports = User;