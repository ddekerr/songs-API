const express = require("express");
const ctrl = require("../../controllers/songs");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { songJoiSchema } = require("../../models/song");

const router = express.Router();

router.get("/", ctrl.getSongsList);
router.get("/:songId", isValidId, ctrl.getSongById);
router.post("/", authenticate, validateBody(songJoiSchema), ctrl.addNewSong);
router.put(
  "/:songId",
  authenticate,
  isValidId,
  validateBody(songJoiSchema),
  ctrl.updateSong
);
router.delete("/:songId", authenticate, isValidId, ctrl.removeSong);

module.exports = router;
