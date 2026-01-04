import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
});

const contentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
  title: String,
  type: String,
  description: String,
  link: String,
});

export const User = mongoose.model("User", userSchema);
export const Content = mongoose.model("Content", contentSchema);
