import fs from "fs";
import Cnab from "../models/upload.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

export const uploadFile = async (req, res) => {
  const formatLine = (line) => {
    return {
      type: line.substring(0, 1),
      date: line.substring(1, 9).trim(),
      value: (+line.substring(9, 19) / 100).toFixed(2).trim(),
      documentNumber: line.substring(19, 30).trim(),
      card: line.substring(30, 42).trim(),
      hour: line.substring(42, 48).trim(),
      ownStore: line.substring(48, 62).trim(),
      nameStore: line.substring(62, 81).trim(),
    };
  };

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dirPath = `${__dirname}/file`;
    const [dirFile] = fs.readdirSync(dirPath);

    if (dirFile) {
      //Read file uploaded
      const filePath = `${dirPath}/${dirFile}`;
      const lines = fs.readFileSync(filePath).toString().split("\r\n"); //Read file uploaded
      const data = [];
      for (const line of lines) {
        data.push(formatLine(line));
      }

      //Insert data in database

      await Cnab.insertMany(data);

      //Excluded file in directory

      fs.unlinkSync(filePath);
    }

    res.send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

export const getFile = async (req, res) => {
  const { pagination } = req.query;

  const countDatabaseCnab = await Cnab.count();

  const databaseCnabs = await Cnab.find()
    .skip(Number(pagination.pageSize) * Number(pagination.current - 1))
    .limit(Number(pagination.pageSize));

  return res.status(200).json([countDatabaseCnab, databaseCnabs]);
};
