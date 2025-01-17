const test = require('tape');

const { users: { getUsersByLang } } = require('../../server/database/queries');
const dbBuild = require('../../server/database/config/dbbuild');

test('Testing for the users by language query', (t) => {
  const expected = {
    id: 1,
    username: 'amoodaa',
    email: 'amoodaa@gmail.com',
    bio: null,
    avatar_path: null,
    native_lang_id: 1,
    learning_lang_id: 6,
    interests: [{ id: 1, name: 'music' }, { id: 2, name: 'sports' }],
  };
  dbBuild()
    .then(() => getUsersByLang(1))
    .then(({ rows: [actual] }) => {
      t.deepEqual(actual, expected, 'The first user should be fadi');
      t.end();
    })
    .catch((err) => t.error(err));
});
