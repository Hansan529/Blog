import mongoose, { Schema } from 'mongoose';

export const portfolioSchema = new Schema({
  url: { type: String, required: true },
  date: { type: String, required: true },
  dateSearch: { type: Date, default: Date.now },
  title: { type: String, required: true },
  developer: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  language: [{ type: String, required: true }],
  description: { type: String, required: true },
});

export default mongoose.models.Portfolio ||
  mongoose.model('Portfolio', portfolioSchema);
