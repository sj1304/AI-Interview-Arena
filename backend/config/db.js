const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("URI =", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("ERROR NAME:", error.name);
    console.error("ERROR MESSAGE:", error.message);
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;