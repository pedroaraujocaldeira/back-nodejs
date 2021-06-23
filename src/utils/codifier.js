const bcrypt = require('bcryptjs');

const codifier = async (password) => {
  const salt = 8;
  const encodedPassword = await bcrypt.hash(password, salt);
  return encodedPassword;
};

const verifyPassword = async (password, userPassword) => {
  const verifiedPassword = await bcrypt.compare(password, userPassword);
  return verifiedPassword;
};

module.exports = {
  codifier,
  verifyPassword,
};
