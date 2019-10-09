const yup = require('yup');

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .max(30)
    .min(2)
    .required(),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]{6,30}$/)
    .required(),
});

module.exports = { loginSchema };
