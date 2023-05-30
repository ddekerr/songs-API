const express = require("express");
const songs = require("../../models/song");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await songs.getSongsList();
  res.json(result);
});

router.get("/:songId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:songId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:songId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
