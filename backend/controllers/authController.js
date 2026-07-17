const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_fallback_secret_key';

// ==========================================
// 1. REGISTER USER
// ==========================================
exports.register = async (req, res) => {
    console.log("--> AUTH ACTION: Register lifecycle sequence triggered.");
    console.log("--> INCOMING DATA PAYLOAD:", req.body);

    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            console.log("--> STATUS 400: Fields missing from incoming registration body");
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        console.log("--> QUERYING MONGO FOR DUPLICATE USERNAME/EMAIL...");
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            console.log("--> STATUS 400: Username or Email already exists in Atlas cluster");
            return res.status(400).json({ message: 'Username or Email already registered' });
        }

        console.log("--> GENERATING SALTS AND HASHING PASSWORD...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("--> COMMITTING NEW USER DOCUMENT TO MONGO...");
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
        });
        console.log("--> USER DOCUMENT CREATED:", newUser._id);

        console.log("--> ISSUING REGISTRATION JWT...");
        const token = jwt.sign(
            { id: newUser._id }, 
            jwtSecret, 
            { expiresIn: '30d' }
        );

        console.log("--> DISPATCHING STATUS 201 REGISTRATION SUCCESS PACKET");
        return res.status(201).json({
            token,
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture || ''
            }
        });

    } catch (error) {
        console.error('CRITICAL REGISTRATION FAILURE INTERCEPTED:', error);
        return res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// ==========================================
// 2. LOGIN USER
// ==========================================
exports.login = async (req, res) => {
    console.log("--> AUTH ACTION: Login lifecycle sequence triggered.");
    console.log("--> INCOMING DATA PAYLOAD:", req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("--> STATUS 400: Fields missing from incoming login body payload");
            return res.status(400).json({ message: 'Please enter all required fields' });
        }

        console.log("--> QUERYING MONGO FOR EMAIL:", email);
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log("--> STATUS 400: User search failed to find profile match");
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        console.log("--> USER RECORD IDENTIFIED:", user._id);

        console.log("--> DECRYPTING PASSWORD HASH ASSERTION...");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("--> STATUS 400: Password mismatch verification failure");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log("--> ISSUING COMPLIANT JWT ASYMMETRIC TRANSACTION...");
        const token = jwt.sign(
            { id: user._id }, 
            jwtSecret, 
            { expiresIn: '30d' }
        );
        console.log("--> TOKEN GENERATED SUCCESSFULLY");

        console.log("--> DISPATCHING STATUS 200 SUCCESS PACKET");
        return res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture || ''
            }
        });

    } catch (error) {
        console.error('CRITICAL TRANSACTION FAILURE INTERCEPTED:', error);
        return res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};