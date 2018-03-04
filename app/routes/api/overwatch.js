"use strict";
const express = require("express");
const merge = require("merge");
const router = express.Router();
const Promise = require("promise");
const config = require("./overwatch.config.js").overwatch;
const utils = require("../../lib/utils");
const async = require("async");
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");
const OverwatchApi = require("../../lib/gamestats").overwatch;

let _cleanField = s => {
	return s
		.toLowerCase()
		.replace(/^gameswon$/i, "total_wins")
		.replace(/^played$/i, "matches")
		.replace(/avg$/i, "")
		.replace(/^(ranked_)?solokills$/i, "$1kills")
		.replace(/(_?)won$/i, "$1wins")
		.replace(/(medals)(bronze|silver|gold)$/i, "$1_$2");
};

let _specialClean = s => {
	return s
		.toLowerCase()
		.replace(/^competitivestats_/i, "ranked_")
		.replace(/^quickplaystats_/i, "");
};

let _displayValue = (field, value) => {
	if (/timeplayed$/i.test(field)) {
		return moment
			.duration(value * 1000)
			.format("YY[y] MM[m] ww[w] dd[d] hh[h] mm[m] ss[s]");
	} else if (/_$/i.test(field)) {
		return `${value}%`;
	} else {
		return value.toLocaleString();
	}
};

let _processGroupItem = (itemName, item, grouupName) => {
	let field = _cleanField(itemName);
	let val = item;
	let display = _displayValue(field, val);
	let fieldName = _specialClean(
		(grouupName ? grouupName + "_" + field : field).toLowerCase()
	);
	console.log(fieldName);
	let label = config.FIELDS[fieldName];
	if (label) {
		return { label: label, field: fieldName, value: val, display: display };
	} else {
		return null;
	}
};

let _processGroups = (group, name) => {
	let result = [];
	if ( typeof(group) === "string" || typeof(group) === "number" ) {
		let item = _processGroupItem(name, group);
		if(item) {
			result.push(item);
		}
	} else {
		for (let i in group) {
			if (group.hasOwnProperty(i)) {
				let item = _processGroupItem(i, group[i], name);
				if(item) {
					result.push(item);
					console.log(item);
				}
			}
		}
	}
	return result;
};


let _processData = stats => {
	return new Promise((resolve, reject) => {
		let data = [];
		for (let g in stats) {
			if (stats.hasOwnProperty(g)) {
				console.log(`process: ${g}`);
				data = data.concat(_processGroups(stats[g], g));
				if (/stats$/i.test(g)) {
					data = data.concat(_processGroups(stats[g].awards, g));
					data = data.concat(_processGroups(stats[g].games, g));
				}
			}
		}
		console.log(data);
		return resolve(data);
	});
};

let _filterFields = (data, fields) => {
	return new Promise((resolve, reject) => {
		async.filter(
			data,
			(item, done) => {
				// fs.access(filePath, function(err) {
				// 	callback(null, !err);
				// });
				let result =
					utils.array.hasValue(fields, "*") ||
					utils.array.hasValue(fields, item.field);
				done(null, result);
			},
			function(err, results) {
				// results now equals an array of the existing files
				if (err) {
					return reject(err);
				}
				return resolve(results);
			}
		);
	});
};


router.get("/:platform/:username/:region?", (req, res, next) => {
	let server = new OverwatchApi({});
	let fields = (req.query.fields || "*").split(/,|\||;/i);
	let platform = req.params.platform;
	server
		.stats(platform, req.params.username, req.params.region)
		.then(body => {
			_processData(body)
				.then(result => {
					_filterFields(result, fields).then(r => {
						res.json(r);
					});
				})
				.catch(err => {
					console.error(err);
					return res.status(500).send(err);
				});
		})
		.catch(err => {
			console.error(err);
			return res.status(500).send(err);
		});
});

router.get("/raw/:platform/:username/:region?", (req, res, next) => {
	let server = new OverwatchApi({});
	server
		.stats(req.params.platform, req.params.username, req.params.region)
		.then(body => {
			res.json(body);
		})
		.catch(err => {
			console.error(err);
			return res.status(500).send(err);
		});
});

module.exports = router;
