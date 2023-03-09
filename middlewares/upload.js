import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("file"));
  },
  filename: (req, file, cb) => {
    const time = new Date().getTime();
    cb(null, `${time}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
const uploadMiddleware = upload.single("file");

export default uploadMiddleware;
