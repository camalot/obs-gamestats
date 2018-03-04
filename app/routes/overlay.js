'use strict';
const express = require('express');
const router = express.Router();
const config = require('./overlay.config.js');
const url = require('url');

router.get('/fortnite/:platform/:username/:mode?', (req, res, next) => {
	if(!config.fortnite.API_KEY) {
		return res.statusCode(500).send("Fortnite Tracker API Key missing");
	}
	// todo: use this function to call all renders automatically.
	let loader = "general";
	res.render("game", {
		loader: loader,
		args: {
			platform: req.params.platform,
			username: req.params.username,
			mode: req.params.mode,
			fields: req.query["fields"],
			poll: config.fortnite.POLL_DELAY,
			game: "fortnite"
		}
	});
});

router.get("/seige/:platform/:username/", (req, res, next) => {
	let loader = "general";
	res.render("game", {
		loader: loader,
		args: {
			platform: req.params.platform,
			username: req.params.username,
			fields: req.query["fields"],
			poll: config.seige.POLL_DELAY,
			mode: "",
			game: "seige"
		}
	});
});

router.get("/overwatch/:platform/:username/:region?", (req, res, next) => {
	let loader = "general";
	res.render("game", {
		loader: loader,
		args: {
			platform: req.params.platform,
			username: req.params.username,
			region: req.params.region || "us",
			fields: req.query["fields"],
			poll: config.seige.POLL_DELAY,
			mode: "",
			game: "overwatch"
		}
	});
});

module.exports = router;
