import mongoose from "mongoose";
import { title } from "process";
const binanceAnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  articleUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const binanceAnnouncementModel = mongoose.model(
  "binanceAnnouncement",
  binanceAnnouncementSchema
);

export default binanceAnnouncementModel;
