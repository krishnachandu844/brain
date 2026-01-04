import express from "express";
import { authMiddleWare } from "../middleware.js";
import { Content } from "../database/schema.js";

const router = express.Router();

router.post("/addcontent", authMiddleWare, async (req, res) => {
  const { userId } = req;
  const { title, type, link, description } = req.body;
  try {
    const newContent = await Content.create({
      title,
      type,
      link,
      description,
      userId,
    });
    res.status(200).json({
      content: {
        id: newContent.id,
        title: newContent.title,
        type: newContent.type,
        description: newContent.description,
        link: newContent.link,
      },
      message: "Content Added Successfully",
    });
    return;
  } catch (error) {
    res.status(401).json({ message: "Error While Adding Content" });
    return;
  }
});

router.get("/getcontent", authMiddleWare, async (req, res) => {
  const { userId } = req;
  try {
    const contents = await Content.find({ userId });
    res.json({ contents });
    return;
  } catch (error) {
    res.status(401).json({ message: "Error while getting contents" });
    return;
  }
});

export default router;
