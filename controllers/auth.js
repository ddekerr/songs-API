const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.json({
    name: newUser.name,
    email: newUser.email,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
