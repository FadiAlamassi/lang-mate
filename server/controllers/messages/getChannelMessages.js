const { messages } = require('../../database/queries');

exports.getChannelMessages = (req, res, next) => {
  messages
    .getChannelMessages(req.params.id)
    .then(({ rows }) => res.json({
      data:
      {
        channelId: req.params.id,
        messages: rows,
      },
    }))
    .catch(next);
};
