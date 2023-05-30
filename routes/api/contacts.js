const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
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
