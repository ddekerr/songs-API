const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { ctrlWrapper, HttpError, setJwtToken } = require("../helpers");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;

  // Сhecking for the existence of the user in DB
  const user = await User.findOne({ email });
  if (user) throw HttpError(409, "Email already in use");

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);

  // create new user in DB
  const newUser = await User.create({ ...req.body, password: hashPassword });

  // write `token` in DB
  const token = setJwtToken(newUser._id);
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: { name: newUser.name, email: newUser.email },
    token,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  // Сhecking for the existence of the user in DB
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, "Email or password are invalid");

  // check hashed password
  const isTruePassword = await bcrypt.compare(password, user.password);
  if (!isTruePassword) throw HttpError(403, "Password are invalid");

  // write `token` in DB
  const token = setJwtToken(user._id);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    user: { name: user.name, email: user.email },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  // remove `token` from DB
  await User.findByIdAndUpdate(_id, { token: "" });

  res.json({ message: "Logout success" });
};

const refresh = async (req, res) => {
  const { name, email } = req.user;
  res.json({ user: { name, email } });
};

const setAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempDir, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const publicDir = path.join(avatarsDir, filename);
  await fs.rename(tempDir, publicDir);
  const avatar = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatar });

  res.json({ message: "File Save", avatar });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
  setAvatar: ctrlWrapper(setAvatar),
};
