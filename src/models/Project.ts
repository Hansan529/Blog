import mongoose from 'mongoose';

export const projectSchema = new mongoose.Schema({
  url: { type: String, required: true },
  date: { type: String, required: true },
  dateSearch: { type: Date, default: Date.now },
  title: { type: String, required: true },
  developer: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Admin' },
  ],
  thumbnail: { type: String, required: true },
  language: [{ type: String, required: true }],
  description: { type: String, required: true },
});

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema);
