"use strict";
const express = require("express");
const router = express.Router();
const config = require("./overlay.config.js");
const url = require("url");
const request = require("request-promise");
const fs = require("fs");
const path = require("path");

const projectPath = path.join(__dirname, "../../");

router.get("/", (req, res, next) => {
	let readme = path.join(projectPath, "readme.md");
	fs.readFile(readme, "utf8", function(err, contents) {
		let options = {
			method: "POST",
			body: JSON.stringify({
				text: contents,
				mode: "gfm",
				context: "camalot/obs-gamestats"
			}),

			url: "https://api.github.com/markdown",
			headers: { "Content-Type": "text/plain", "User-Agent": "OBS-GAMESTATS Site" },
			qs: undefined,
			json: false
		}; // Automatically parses the JSON string in the response

		request.post(options).then((data) => {
			res.render("index", { layout: "readme-layout", data: data });
		}).catch( (err) => {
			throw err;
		});
	});
});

module.exports = router;
