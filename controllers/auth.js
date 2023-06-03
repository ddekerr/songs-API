const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;
const { User } = require("../models/user");
const { ctrlWrapper, HttpError, setJwtToken } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email already in use");

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  const token = setJwtToken(newUser._id);
  res.status(201).json({
    user: { name: newUser.name, email: newUser.email },
    token,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password are invalid");
  }

  const isTruePassword = await bcrypt.compare(password, user.password);

  if (!isTruePassword) {
    throw HttpError(403, "Bad password");
  }

  const token = setJwtToken(user._id);
  res.json({ token });
};

const logout = async (req, res) => {
  res.json({ message: "Logout success" });
};

const refresh = async (req, res) => {
  const { id } = jwt.verify(
    req.headers.authorization.split(" ")[1],
    SECRET_KEY
  );
  const user = await User.findById(id);

  if (!user) {
    throw HttpError(401, "Email are invalid");
  }
  res.json({ user: { name: user.name, email: user.email } });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  refresh: ctrlWrapper(refresh),
};
