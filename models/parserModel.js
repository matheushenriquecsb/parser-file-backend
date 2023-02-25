import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    type: String,
    date: String,
    value: String,
    documentNumber: String,
    card: String,
    hour: String,
    ownStore: String,
    nameStore: String,
  },
  { timestamps: true }
);

const fileModel = mongoose.model("fileparser", fileSchema);

export default fileModel;
