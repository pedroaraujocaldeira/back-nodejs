const Joi = require('joi');
const { password, cpf } = require('./custom.validation');

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const register = {
  body: Joi.object().keys({
    cpf: Joi.string().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
  body: Joi.object()
    .keys({
      cpf: Joi.string(),
      password: Joi.string().custom(password),
      name: Joi.string(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number(),
  }),
};

const createUser = {
  body: Joi.object().keys({
    cpf: Joi.string().required().custom(cpf),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

module.exports = {
  register,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
};
