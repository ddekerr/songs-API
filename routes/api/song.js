const express = require("express");
const ctrl = require("../../controllers/songs");
const { validateBody } = require("../../middlewares");
const { songSchema } = require("../../schemas/songs");

const router = express.Router();

router.get("/", ctrl.getSongsList);
router.get("/:songId", ctrl.getSongById);
router.post("/", validateBody(songSchema), ctrl.addNewSong);
router.put("/:songId", validateBody(songSchema), ctrl.updateSong);
router.delete("/:songId", ctrl.removeSong);

module.exports = router;
