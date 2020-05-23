const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res) {
  return res.status(200).json({ success: 'true', data: 'This was a mistake' });
});

app.use('/v1/', routes.v1);

app.use(function (req, res) {
  return res.status(404).send('Not found');
});

app.listen(5000);
