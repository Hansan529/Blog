import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  member: [{ type: String, required: true }],
  img: { type: String },
  language: [{ type: String, required: true }],
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
