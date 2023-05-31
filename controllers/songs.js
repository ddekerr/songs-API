const { Song } = require("../models/song");
const { HttpError, ctrlWrapper } = require("../helpers");

const getSongsList = async (req, res) => {
  const result = await Song.find();
  res.json(result);
};

const getSongById = async (req, res) => {
  const { songId } = req.params;
  const result = await Song.findById(songId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addNewSong = async (req, res) => {
  const result = await Song.create(req.body);
  res.status(201).json(result);
};

const updateSongByID = async (req, res) => {
  const { songId } = req.params;
  const result = await Song.findByIdAndUpdate(songId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeSongById = async (req, res) => {
  const { songId } = req.params;
  const result = await Song.findByIdAndRemove(songId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success", result });
};

module.exports = {
  getSongsList: ctrlWrapper(getSongsList),
  getSongById: ctrlWrapper(getSongById),
  addNewSong: ctrlWrapper(addNewSong),
  updateSong: ctrlWrapper(updateSongByID),
  removeSong: ctrlWrapper(removeSongById),
};
