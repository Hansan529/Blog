import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  url: { type: String, required: true },
  date: { type: String, required: true },
  dateSearch: { type: Date, default: Date.now },
  title: { type: String, required: true },
  developer: [{ type: String, required: true }],
  thumbnail: { type: String, required: true },
  language: [{ type: String, required: true }],
  description: { type: String, required: true },
  sourceCode: { type: String, required: true },
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
