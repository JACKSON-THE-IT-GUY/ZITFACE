const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Check if a token is present in the incoming request's HTTP headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract the raw token string from the "Bearer <TOKEN>" header format
      token = req.headers.authorization.split(' ')[1];

      // Decode and verify the token signature using your secret key from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach the decoded user ID data payload to the request object
      req.user = { id: decoded.id };

      // Move forward to the controller logic
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token verification failed' });
    }
  }

  // If no token is attached to the request headers at all
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no session token found' });
  }
};

module.exports = { protect };