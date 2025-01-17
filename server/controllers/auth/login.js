const { compare } = require('bcrypt');

const { jwtSign } = require('../../helpers');
const { getUserByUsername, reactivateUser } = require('../../database/queries/users');
const { loginSchema } = require('./validation/login-validation');

exports.login = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) throw ({ code: 400, msg: 'bad request !!!!' });

  const key = process.env.KEY;
  let id;
  let user;
  loginSchema.validate(req.body)
    .then(() => getUserByUsername(username))
    .then(({ rows }) => {
      if (rows && rows[0]) {
        const {
          id: userId, username: userName, password: dbPassword, isactive,
        } = rows[0];
        user = { userId, userName };
        id = userId;
        const reactivePromise = isactive ? Promise.resolve(true) : reactivateUser();
        return Promise.all([compare(password, dbPassword), reactivePromise]);
      }
      throw ({ code: 400, msg: 'username doesn\'t exist' });
    })
    .then(([isValid]) => {
      if (isValid) {
        return jwtSign({ userInfo: { username, id } }, key);
      }
      throw ({ code: 400, msg: 'username or password doesn\'t match our records' });
    })
    .then((token) => {
      res.cookie('token', token, { maxAge: 8400000, httpOnly: true });
      res.send({ isSuccess: true, message: 'success', data: user });
    })
    .catch(next);
};
