const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { songId } = req.params;
  if (!isValidObjectId(songId)) {
    next(HttpError(400, `${songId} is not valid ID`));
  }
  next();
};

module.exports = isValidId;
