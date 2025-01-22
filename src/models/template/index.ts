import mongoose from "mongoose";
const config = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const TemplateSchema = mongoose.model("template", config);

export default TemplateSchema;
