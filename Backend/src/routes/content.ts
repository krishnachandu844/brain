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
    res.status(200).json({ contents });
    return;
  } catch (error) {
    res.status(401).json({ message: "Error while getting contents" });
    return;
  }
});

router.delete("/deletecontent/:deleteId", authMiddleWare, async (req, res) => {
  const { deleteId } = req.params;
  console.log(deleteId);
  try {
    const deletedContent = await Content.findByIdAndDelete(deleteId);
    res.status(200).json({ message: "Content Deleted Successfully" });
  } catch (error) {
    res.status(401).json({ message: "Error while Deleting content" });
    return;
  }
});
export default router;
