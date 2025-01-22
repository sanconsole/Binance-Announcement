import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
      unique: true,
    },
    image: {
      type: String,
    },
    pubDate: {
      type: Date,
    },
    type: {
      type: String,
    },
  },
  { timestamps: { createdAt: "pubDate" } }
);
const DataSchema = mongoose.model("data", schema);

export default DataSchema;
