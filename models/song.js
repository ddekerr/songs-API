const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// absolute path to contacts.json
const songPath = path.join(__dirname, "./songs.json");

// get all songs
const getSongsList = async () => {
  const songsList = await fs.readFile(songPath);
  return JSON.parse(songsList);
};

// get one song by ID
const getSongById = async (songId) => {
  const songsList = await getSongsList();
  const song = songsList.find((song) => song.id === songId);

  return song || null;
};

// add new song
const addNewSong = async (data) => {
  const songsList = await getSongsList();
  const newSong = {
    id: nanoid(),
    ...data,
  };
  const updatedSongsList = songsList.concat(newSong);

  await fs.writeFile(songPath, JSON.stringify(updatedSongsList, null, 2));
  return newSong;
};

// update song by ID
const updateSong = async (songId, data) => {
  const songsList = await getSongsList();
  const songIndex = songsList.findIndex((song) => Number(song.id) === songId);
  if (songIndex === -1) return null;
  songsList[songIndex] = { songId, ...data };

  await fs.writeFile(songPath, JSON.stringify(songsList, null, 2));
  return songsList[songIndex];
};

// remove song by ID
const removeSong = async (songId) => {
  const songsList = await getSongsList();
  const songIndex = songsList.findIndex((song) => Number(song.id) === songId);
  if (songIndex === -1) return null;
  const [result] = songsList.splice(songIndex, 1);

  await fs.writeFile(songPath, JSON.stringify(songsList, null, 2));
  return result;
};

module.exports = {
  getSongsList,
  getSongById,
  addNewSong,
  updateSong,
  removeSong,
};
