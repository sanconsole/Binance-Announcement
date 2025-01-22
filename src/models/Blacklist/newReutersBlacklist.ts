import mongoose from "mongoose";
const newReutersBlacklist = new mongoose.Schema({
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
const newReutersBlacklistSchema = mongoose.model(
  "newReutersBlacklist",
  newReutersBlacklist
);

export default newReutersBlacklistSchema;
