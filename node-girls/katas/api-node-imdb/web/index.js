const express = require('express');
const db = require('../database');
const core = require('../core/create-movie.js');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/movie', async function(req, res) {
 // console.log('description');
  console.log(req.body.desc);
  console.log('amazing people are here');
	const error = await core(db)(req.body.title, req.body.desc);

	if (error) {
		return res.status(400).send(error);
	}

  res.status(201).json({ title: req.body.title, description: req.body.desc });
});

module.exports = app;