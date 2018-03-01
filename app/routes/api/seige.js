"use strict";
const express = require("express");
const merge = require("merge");
const router = express.Router();
const Promise = require("promise");
const config = require("./seige.config.js");
const utils = require("../../lib/utils");
const async = require("async");
const R6SeigeApi = require("../../lib/gamestats").seige;

/* GET home page. */
router.get("/:platform/:username/:mode?", (req, res, next) => {
	let server = new R6SeigeApi({});
	let fields = (req.query.fields || "*").split(/,|\||;/i);

	let mode = req.params.mode || "casual";
	
	server
		.stats(req.params.platform, req.params.username)
		.then(body => {
			res.json(body);
		}).catch( (err) => {
			console.error(err);
			res.status(500).send(err);
		});
});


module.exports = router;
