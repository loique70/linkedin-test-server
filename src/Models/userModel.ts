import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sectors: { type: [String], required: true },
  terms: { type: Boolean, required: true },
});

const User = mongoose.model("User", userSchema);

export default User;
