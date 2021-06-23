const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const codifier = require('../utils/codifier');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  const userPassword = userBody;
  userPassword.password = await codifier.codifier(userBody.password);

  const exist = await User.findOne( { where: {cpf: userBody.cpf } });
  console.log(exist);
  let user;
  if (!exist) {
    user = await User.create(userPassword);
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'User found');
  }


  return user;
};

/**
 * Query for users
 * @param {Object} filter -  Filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.findAndCountAll(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  const user = await User.findByPk(id);
  return user;
};

/**
 * Get user by cpf
 * @param {string} cpf
 * @returns {Promise<User>}
 */
const getUserByCpf = async (cpf) => {
  return User.findOne({ where: { cpf } });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const userPassword = userBody;
  userPassword.password = await codifier.codifier(userBody.password);
  Object.assign(user, userPassword);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByCpf,
  updateUserById,
  deleteUserById,
};
