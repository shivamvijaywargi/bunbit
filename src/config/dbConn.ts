import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/urlShortner"
    );

    if (conn) {
      console.log(`Connected to MongoDB at: ${conn.connection.host}`);
    } else {
      console.log(`Unable to connect to MongoDB`);
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
