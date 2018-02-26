'use strict';
const express = require('express');
const router = express.Router();
const config = require('../config')
const url = require('url')

router.get('/fortnite/:platform/:username/:mode?', (req, res, next) => {
	let loader = 'fortnite';
	res.render("game", {
		loader: loader,
		args: {
			platform: req.params.platform,
			username: req.params.username,
			mode: req.params.mode,
			fields: req.query['fields'],
			poll: config.fortnite.POLL_DELAY,
			game: loader
		}
	});
});


module.exports = router;
