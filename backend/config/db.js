const mongoose = require('mongoose');

const connectDB = async () => {
  try {
  
    const dbUri = "mongodb+srv://jacksonnsonga76_db_user:JACKSON2003@cluster0.or81txa.mongodb.net/zitface?retryWrites=true&w=majority";
    
    const conn = await mongoose.connect(dbUri);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("Database Connection Error Detail: " + error.message);
    throw error;
  }
};

module.exports = connectDB;