const path = require('path');
// 1. Force explicit loading of the .env file from the current directory
require('dotenv').config({ path: path.join(__dirname, '.env') });

// 2. Immediate Debug Verification Line
console.log("DEBUG - Loaded URL Check:", process.env.MONGO_URL ? "FOUND" : "NOT FOUND (UNDEFINED)");

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import your application routes (Clean & Unique)
const authRoutes = require('./routes/auth');
const zitRoutes = require('./routes/zits'); 

const app = express();
const PORT = process.env.PORT || 5001;

// 3. Connect to MongoDB Atlas Cluster
connectDB().catch(err => {
    console.error("Critical connection block encountered. Running in offline/fallback mode.");
});

// 4. Global Middleware Setup
app.use(cors({
    origin: 'http://localhost:5173', // Points directly to your frontend Vite server
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. REST API Route Definitions
app.use('/api/auth', authRoutes);
app.use('/api/zits', zitRoutes); 

// Root Status Check Route
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "Online", 
        message: "Zitface API Gateway is running smoothly." 
    });
});

// Global Fallback Error Handler
app.use((err, req, res, next) => {
    console.error("Unhandled Server Error:", err.stack);
    res.status(500).json({ error: "Internal Server Error during transaction." });
});

// 6. Fire up Gateway Listener
// Change this line at the bottom of backend/server.js
app.listen(PORT, '127.0.0.1', () => {
    console.log(`Server is running securely on http://127.0.0.1:${PORT}`);
});