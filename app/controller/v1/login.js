const { login } = require('../../services').v1;

module.exports = async (req, res) => {
  res.json({ hello: 'world', ok: await login() });
};
