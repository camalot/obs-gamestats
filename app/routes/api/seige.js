"use strict";
const express = require("express");
const merge = require("merge");
const router = express.Router();
const Promise = require("promise");
const config = require("./seige.config.js").seige;
const utils = require("../../lib/utils");
const async = require("async");
const R6SeigeApi = require("../../lib/gamestats").seige;
const moment = require("moment");
const momentDurationFormatSetup = require("moment-duration-format");

let _specialClean = s => {
	return s
		.toLowerCase()
		.replace(/^casual_/i, "")
		.replace(/_season$/i, "")
		.replace(/^ranking_/i, "")
		.replace(/^progression_/i, "");
};

let _cleanField = s => {
	return s
		.toLowerCase()
		.replace(/_([a-z])/i, "$1")
		.replace(/^wlr$/i, "wins_")
		.replace(/^playtime$/i, "timeplayed");
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
let _processGroups = (group, name) => {
	let result = [];
	for (let i in group) {
		if (group.hasOwnProperty(i)) {
			let field = _cleanField(i);
			let val = group[i];
			let display = _displayValue(field, val);
			let fieldName = _specialClean(
				(name ? name + "_" + field : field).toLowerCase()
			);
			let label = config.FIELDS[fieldName];
			if (label) {
				let item = {
					label: label,
					field: fieldName,
					value: val,
					display: display
				};
				console.log(item);
				result.push(item);
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
				data = data.concat(_processGroups(stats[g], g));
				if (g === "season") {
					data = data.concat(_processGroups(stats.season.ranking, "ranking"));
				}
			}
		}
		console.log(data);
		return resolve(data);
	});
};

let _filterFields = (data, fields) => {
	return new Promise((resolve, reject) => {
		async.filter(data, (item, done) => {
				// fs.access(filePath, function(err) {
				// 	callback(null, !err);
				// });
				let result = utils.array.hasValue(fields, "*") ||
					utils.array.hasValue(fields, item.field);
				done(null, result);
			},
			function(err, results) {
				// results now equals an array of the existing files
				if(err){
					return reject(err);
				}
				return resolve(results);
			}
		);
	});
};

/* GET home page. */
router.get("/:platform/:username", (req, res, next) => {
	let server = new R6SeigeApi({});
	let fields = (req.query.fields || "*").split(/,|\||;/i);
	server
		.stats(req.params.platform, req.params.username)
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

router.get("/raw/:platform/:username", (req, res, next) => {
	let server = new R6SeigeApi({});
	server
		.stats(req.params.platform, req.params.username)
		.then(body => {
			res.json(body);
		})
		.catch(err => {
			console.error(err);
			return res.status(500).send(err);
		});
});

module.exports = router;
