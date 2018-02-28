"use strict";
const express = require("express");
const router = express.Router();
const config = require("./overlay.config.js");
const url = require("url");
// const request = require("request-promise");
const fs = require("fs");
const path = require("path");
const showdown = require("showdown");
const projectPath = path.join(__dirname, "../../");

router.get("/", (req, res, next) => {
	let readme = path.join(projectPath, "readme.md");
	fs.readFile(readme, "utf8", function(err, contents) {

		let converter = new showdown.Converter();
		converter.setFlavor("github");
		let data = converter.makeHtml(contents);
		res.render("index", { layout: "readme-layout", data: data });
	});
});

module.exports = router;
