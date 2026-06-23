const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(` MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(` Database Connection Failure: ${error.message}`);
    process.exit(1);
  }
};

// CRITICAL: Make sure this line does NOT have curly braces around connectDB
module.exports = connectDB;