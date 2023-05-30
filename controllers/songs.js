const songs = require("../models/song");
const { HttpError, ctrlWrapper } = require("../helpers");

const getSongsList = async (req, res) => {
  const result = await songs.getSongsList();
  res.json(result);
};

const getSongById = async (req, res) => {
  const { songId } = req.params;
  const result = await songs.getSongById(songId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addNewSong = async (req, res) => {
  const result = await songs.addNewSong(req.body);
  res.status(201).json(result);
};

const updateSong = async (req, res) => {
  const result = await songs.updateSong(req.params.songId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeSong = async (req, res) => {
  const { songId } = req.params;
  const result = await songs.removeSong(songId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Delete success", result });
};

module.exports = {
  getSongsList: ctrlWrapper(getSongsList),
  getSongById: ctrlWrapper(getSongById),
  addNewSong: ctrlWrapper(addNewSong),
  updateSong: ctrlWrapper(updateSong),
  removeSong: ctrlWrapper(removeSong),
};
