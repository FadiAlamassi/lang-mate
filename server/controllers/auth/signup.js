const { hash } = require('bcrypt');

const { jwtSign } = require('../../helpers');
const { signupSchema } = require('./validation/signup-validation');
const { users: { getUserByEmailOrUsername, addUser, addUserInterests } } = require('../../database/queries');


exports.signup = (req, res, next) => {
  const {
    username, email, password, interestsId,
  } = req.body;

  signupSchema.validate(req.body)
    .then(() => getUserByEmailOrUsername(email, username))
    .then(({ rows }) => {
      if (rows.length !== 0) {
        if (rows[0].username === username) throw ({ code: 400, msg: 'username exists' });
        if (rows[0].email === email) throw ({ code: 400, msg: 'email exists' });
      }
    })
    .then(() => hash(password, 10))
    .then((hashed) => {
      req.body.password = hashed;
      return addUser({ ...req.body });
    })
    .then(({ rows: [addedUser] }) => {
      delete req.body.password;
      req.body.id = addedUser.id;
      return Promise.all([
        jwtSign({ userInfo: { username: addedUser.username, id: addedUser.id } }, process.env.KEY),
        addUserInterests(interestsId, addedUser.id),
      ]);
    })
    .then(([signedPayload]) => {
      res.cookie('token', signedPayload, { maxAge: 86400000 });
      res.send({ isSuccess: true, data: req.body });
    })
    .catch(next);
};
