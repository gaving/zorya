import express from "express";
import transcript from "../lib/transcript";
import ner from "../lib/ner";

const router = express.Router();

router.post("/new", async (req, res) => {
  const { video } = req.body;
  try {
    const cues = await transcript(video);
    const entities = await ner(cues);
    res.send(entities);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
