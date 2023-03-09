import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/routesUpload.js";
import { connectDb } from "./database/index.js";
const app = express();
dotenv.config();

app.use(cors({ origin: "*" }));
app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
  connectDb();
});
