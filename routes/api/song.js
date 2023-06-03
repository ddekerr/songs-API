const express = require("express");
const ctrl = require("../../controllers/songs");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { songJoiSchema } = require("../../models/song");

const router = express.Router();

router.get("/", ctrl.getSongsList);
router.get("/:songId", isValidId, ctrl.getSongById);
router.post("/", validateBody(songJoiSchema), ctrl.addNewSong);
router.put("/:songId", isValidId, validateBody(songJoiSchema), ctrl.updateSong);
router.delete("/:songId", isValidId, ctrl.removeSong);

module.exports = router;
