import mongoose, { Error } from "mongoose";

const connectDb = async () => {
  try {
    const Db_URL = "mongodb://localhost:27017/device_farm";
    mongoose.connect(Db_URL);
  } catch (err) {
    throw new Error("failed to connect to Db ");
  }
};

export default connectDb;
