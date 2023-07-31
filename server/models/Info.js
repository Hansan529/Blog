import mongoose from 'mongoose';

const infoSchema = new mongoose.Schema({
  prefix: { type: String, default: null },
  title: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  description: { type: String },
  etc: { type: String },
});

const Info = mongoose.model('Info', infoSchema);

export default Info;
