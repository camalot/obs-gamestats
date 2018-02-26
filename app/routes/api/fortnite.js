"use strict";
const express = require("express");
const merge = require("merge");
const router = express.Router();
const Promise = require("promise");
const config = require("./fortnite.config.js");
const utils = require("../../lib/utils");
const FortniteApi = require("../../lib/trackernetwork").fortnite;
const async = require("async");
let _cleanField = s => {
	return s
		.replace(/[\s\/]/gi, "")
		.replace(/%/i, "s_")
		.replace(/\s?%/i, "_")
		.replace(/(\d)s/i, "$1_season")
		.toLowerCase();
};

let _cleanLabel = s => {
	return s.replace(/(\d)s/i, "$1 (Season)").replace(/^win%$/i, "Wins %");
};
let _hasValue = (array, value) => {
	return array.indexOf(value) >= 0;
};

let _transformArrayStats = (input, fields) => {
	return new Promise((resolve, reject) => {
		let data = [];
		let added = [];
		for (let x = 0; x < input.length; ++x) {
			let item = input[x];
			let fieldName = _cleanField(item.key);
			if (config.fortnite.LABEL_TO_FIELD[fieldName]) {
				fieldName = config.fortnite.LABEL_TO_FIELD[fieldName];
			}

			let winIndex = null;
			if (!_hasValue(added, "wins_")) {
				for (let f = 0; f < data.length; ++f) {
					if (data[f].field === "wins") {
						winIndex = f + 1;
						break;
					}
				}
			}
			if (
				!_hasValue(added, fieldName) &&
				(_hasValue(fields, fieldName) || _hasValue(fields, "*"))
			) {
				added.push(fieldName);
				let aitem = {
					field: fieldName,
					label: _cleanLabel(item.key),
					value: item.value,
					display: item.value
				};
				data.splice(winIndex ? winIndex : 0, 0, aitem);
			}
		}

		return resolve(data);
	});
};

let _transformObjectStats = (input, fields) => {
	return new Promise((resolve, reject) => {
		try {
			let data = [];
			let added = [];
			for (let f in input) {
				if (input.hasOwnProperty(f)) {
					let item = input[f];
					let fieldName = _cleanField(item.label);
					if (config.fortnite.LABEL_TO_FIELD[fieldName]) {
						fieldName = config.fortnite.LABEL_TO_FIELD[fieldName];
					}
					if (
						(_hasValue(fields, fieldName) || _hasValue(fields, "*")) &&
						!_hasValue(added, fieldName) &&
						!fieldName.endsWith("_")
					) {
						added.push(fieldName);
						console.log("added: " + fieldName);
						data.splice(0, 0, {
							field: fieldName,
							label: item.label,
							value: item.value,
							display: item.displayValue || item.value
						});
					}
					if (
						item.percentile &&
						!_hasValue(added, `${fieldName}_`) &&
						!fieldName.endsWith("_") &&
						(_hasValue(fields, `${fieldName}_`) || _hasValue(fields, "*"))
					) {
						let fieldIndex = null;
						if (_hasValue(fields, `${fieldName}_`)) {
							for (let f = 0; f < data.length; ++f) {
								if (data[f].field === fieldName) {
									fieldIndex = f + 1;
									break;
								}
							}
						}
						added.push(`${fieldName}_`);
						console.log("added: " + fieldName + "_");
						console.log("index: " + fieldIndex);
						data.splice(fieldIndex ? fieldIndex : 0, 0, {
							field: `${fieldName}_`,
							label: `${item.label} %`,
							value: item.percentile,
							display: `${item.percentile}%`
						});
					}
				}
			}

			let winIndex = null;
			if (_hasValue(fields, "wins_")) {
				for (let f = 0; f < data.length; ++f) {
					if (data[f].field === "wins") {
						winIndex = f + 1;
						break;
					}
				}
			}
			if (
				!_hasValue(added, "wins_") &&
				(_hasValue(fields, "wins_") || _hasValue(fields, "*"))
			) {
				let matches = input.matches.value;
				let wins = input.top1.value;
				let percentile = wins / matches * 100;
				console.log("index: " + winIndex);
				let aitem = {
					field: `wins_`,
					label: `Wins %`,
					value: percentile,
					display: `${percentile}%`
				};
				data.splice(winIndex ? winIndex : 0, 0, aitem);
			}

			if (_hasValue(fields, "*")) {
				console.log("sort");
				data.sort(function(a, b) {
					if (a.field < b.field) {
						return -1;
					}
					if (a.field > b.field) {
						return 1;
					}
					return 0;
				});
			}
			return resolve(data);
		} catch (err) {
			return reject(err);
		}
	});
};

/* GET home page. */
router.get("/:platform/:username/:mode?", (req, res, next) => {
	let settings = {
		API_KEY: config.fortnite.API_KEY
	};
	let server = new FortniteApi(settings);
	let fields = (req.query.fields || "*").split(/,|\||;/i);
	server
		.stats(req.params.platform, req.params.username)
		.then(body => {
			if(!body || body.error){
				return res.status(500).send(body.error || "Unknown Error");
			}
			let mode = req.params.mode || "all";
			if (mode === "all") {
				let data = body[config.fortnite.MODES[mode]];
				_transformArrayStats(data, fields)
					.then(data => {
						return res.json(data);
					})
					.catch(err => {
						return res.status(500).send(err.message);
					});
			} else {
				let source = body.stats[config.fortnite.MODES[mode]];
				if (!source) {
					return res.json([]);
				} else {
					_transformObjectStats(source, fields)
						.then(data => {
							return res.json(data);
						})
						.catch(err => {
							return res.status(500).send(err.message);
						});
				}
			}
		})
		.catch(err => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return next();
		});
});

/* GET home page. */
router.get("/raw/:platform/:username/:mode?", (req, res, next) => {
	let settings = {
		API_KEY: config.fortnite.API_KEY
	};
	let server = new FortniteApi(settings);
	server
		.stats(req.params.platform, req.params.username)
		.then(body => {
			if (!body || body.error) {
				return res.status(500).send(body.error || "Unknown Error");
			}
			let mode = req.params.mode || "all";
			if (mode === "all") {
				let data = body[config.fortnite.MODES[mode]];
				return res.json(data);
			} else {
				let source = body.stats[config.fortnite.MODES[mode]];
				if (!source) {
					return res.json([]);
				} else {
					return res.json(source);
				}
			}
		})
		.catch(err => {
			if (err) {
				return res.status(500).send(err.message);
			}
			return next();
		});
});
module.exports = router;
