import express from "express";
import { uploadFile, getFile } from "../controllers/fileController.js";
import uploadMiddleware from "../middlewares/upload";

const router = express.Router();

router.post("/upload", uploadMiddleware, uploadFile);

router.get("/get", getFile);

export default router;
