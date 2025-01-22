import mongoose from "mongoose";
const newReutersWhitelist = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const newReutersWhitelistSchema = mongoose.model(
  "newReutersWhitelist",
  newReutersWhitelist
);

export default newReutersWhitelistSchema;
