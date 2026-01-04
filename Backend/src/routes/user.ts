import express from "express";
import { User } from "../database/schema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { authMiddleWare } from "../middleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({
    username,
    email,
  });
  if (!user) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUSer = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ userId: newUSer.id }, process.env.JWT_SECRET!);
    res.status(200).json({ message: "User Created Successfully", token });
    return;
  } else {
    res.status(403).json({ message: "User Already Exists" });
    return;
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });
  if (!user || !user.password) {
    res.status(401).json({ message: "User Doesn't Exists" });
    return;
  }
  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (isPasswordCorrect) {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);
    res.status(200).json({ message: "Login Successfully", token });
  } else {
    res.status(401).json({ message: "Password Incorrect" });
    return;
  }
});

router.get("/me", authMiddleWare, async (req, res) => {
  const userId = req;
  try {
    const user = await User.findById(userId).select({
      id: String,
      username: String,
      password: String,
    });
    res.status(200).json({ user });
    return;
  } catch (error) {
    res.status(400).json({ message: "Error while fetching user" });
    return;
  }
});

export default router;
