const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_fallback_secret_key';

module.exports = async (req, res, next) => {
    try {
        // 1. Check if the Authorization header exists and starts with 'Bearer '
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // 2. Extract the actual token string
        const token = authHeader.replace('Bearer ', '').trim();
        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // 3. Verify the token using your JWT Secret key
        const decoded = jwt.verify(token, jwtSecret);

        // 4. Attach the decoded user payload (containing the id) to the request object
        req.user = decoded.user || decoded; // Handles both { user: { id } } and direct { id } payloads

        next(); // Move on to the controller!
    } catch (error) {
        console.error('Middleware Token Error:', error.message);
        res.status(401).json({ message: 'Token is invalid or expired' });
    }
};