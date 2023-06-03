const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const setJwtToken = (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  return token;
};

module.exports = setJwtToken;
