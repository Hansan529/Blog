import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';

export const adminSchema = new Schema({
  socialLogin: { type: Boolean },
  avatarImg: { type: String },
  username: { type: String, match: /[0-9가-힣a-zA-Z]{2,18}/ },
  id: { type: String },
  pw: { type: String },
  email: { type: String, required: true },
});

adminSchema.pre('save', async function (next) {
  if ((this.isNew || this.isModified('pw')) && this.pw) {
    this.pw = await bcrypt.hash(this.pw, 10);
  }
  next();
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
