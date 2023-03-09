import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Database is runnnig");
    });
  } catch (error) {
    console.log(error);
  }
};
