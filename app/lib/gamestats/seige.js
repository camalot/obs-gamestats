"use strict";
const request = require("request-promise");
const config = require("../../config").seige;
const merge = require("merge");

class R6SeigeApi {
	constructor(settings) {}

	stats(platform, user) {
		console.log(config);
		return new Promise((resolve, reject) => {
			if (!platform || !config.PLATFORMS[platform]) {
				console.log("platform");
				return reject(new Error("Unknown platform specified."));
			}
			if (!user) {
				console.log("user");
				return reject(new Error("Username not specified."));
			}
			let url = `${config.BASE_URL}/${user}?platform=${
				config.PLATFORMS[platform]
			}`;
			console.log(url);
			let options = {
				method: "GET",
				url: url,
				headers: {},
				qs: undefined,
				json: true // Automatically parses the JSON string in the response
			};

			return request(options)
				.then(stats => {
					if (!stats.player) {
						return reject(new Error("player stats missing."));
					}
					url = `${config.BASE_URL}/${user}/seasons/?platform=${config.PLATFORMS[platform]}`;
					options = {
						method: "GET",
						url: url,
						headers: {},
						qs: undefined,
						json: true
					};
					request(options)
						.then(sdata => {
							let latestSeason = 0;
							for(let s in sdata.seasons) {
								if(sdata.seasons.hasOwnProperty(s)) {
									let seasonItem = parseInt(s, 0);
									if ( latestSeason < seasonItem ) {
										latestSeason = seasonItem;
									}
								}
							}
							console.log("latestSeason: " + latestSeason);
							let season = sdata.seasons[latestSeason.toString()];
							console.log(season);
							let region = null;
							for(let r in season) {
								if (season.hasOwnProperty(r)) {
									if(region !== null) {
										// take the first region...
										break;
									}
									console.log("get region: " + r);
									region = season[r];
								}
							}
							if(region === null) {
								console.log("set region to null");
								region = {};
							}
							console.log(region);
							stats.player.stats.season = region;
							return resolve(stats.player.stats);
						})
						.catch( (err) => {
							console.error(err);
							return reject(err);
						});
				})
				.catch(err => {
					console.error(err);
					return reject(err);
				});
		});
	}
}

module.exports = R6SeigeApi;
