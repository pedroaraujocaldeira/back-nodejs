const httpStatus = require('http-status');
const sessionService = require('./session.service');
const userService = require('./user.service');
const Token = require('../models/Session');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const codifier = require('../utils/codifier');

/**
 * Login with cpf and password
 * @param {string} cpf
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithCpfAndPassword = async (cpf, password) => {
  const user = await userService.getUserByCpf(cpf);
  if (!user || !(await codifier.verifyPassword(password, user.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect cpf or password');
  }
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ where: { token: refreshToken, type: tokenTypes.REFRESH } });

  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await sessionService.removeToken(refreshTokenDoc.id);
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await sessionService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user_id);
    await sessionService.removeToken(refreshTokenDoc.id);
    return sessionService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise}
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await sessionService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user_id);

    if (!user) {
      throw new Error();
    }
    const encodedPassword = await codifier.codifier(newPassword);
    await userService.updateUserById(user.id, { password: encodedPassword });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  loginUserWithCpfAndPassword,
  logout,
  refreshAuth,
  resetPassword,
};
