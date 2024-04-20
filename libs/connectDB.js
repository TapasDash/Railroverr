import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB connected :${conn.connection.host}`);
    console.log(process.env.MONGO_URI);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
