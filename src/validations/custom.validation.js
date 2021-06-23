const password = (value, helpers) => {
  if (
    !value.match(/\d/) ||
    !value.match(/[a-zA-Z]/) ||
    !value.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/) ||
    value.length < 8
  ) {
    return helpers.message('unsafe_password');
  }
  return value;
};

const email = (value, helpers) => {
  // eslint-disable-next-line global-require
  const validator = require('email-validator');
  if (validator.validate(value)) {
    return value;
  }

  return helpers.message('invalid_email');
};

const cpf = (value, helpers) => {
  const cpfFormat = value.replace(/\D+/g, '');
  if (value.replace(/\D+/g, '').length === 11) {
    return cpfFormat;
  }

  return helpers.message('invalid_cpf');
};

const phone = (value, helpers) => {
  if (value.replace(/\D+/g, '').length === 11) {
    return value.replace(/\D+/g, '');
  }
  return helpers.message('invalid_phone_number');
};

const mode = (value, helpers) => {
  if (value === 'sms' || value === 'email') {
    return value.toUpperCase();
  }
  return helpers.message('invalid_mode');
};

module.exports = {
  password,
  email,
  cpf,
  phone,
  mode,
};
