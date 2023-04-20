import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  socialLogin: { type: String, default: false },
  id: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: function () {
      return !this.socialLogin;
    },
    unique: true,
  },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  keepLogin: Boolean,
});

userSchema.pre("save", async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 5);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
