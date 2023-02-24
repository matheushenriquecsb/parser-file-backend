import mongoose from "mongoose";

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("Database is runnnig");
});
