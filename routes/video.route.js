import express from "express";
import { transcript, ner, neo } from "../lib/";

const router = express.Router();

router.post("/new", async (req, res) => {
  const { video } = req.body;
  try {
    const cues = await transcript(video);
    const entities = await ner(cues);
    const done = await neo(video, entities);
    res.send(done);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

export default router;
