"use strict";
const request = require("request-promise");
const config = require("../../config").overwatch;
const merge = require("merge");

class OverwatchApi {
	constructor(settings) {}

	_isValidPlatform(platform) {
		return platform && config.PLATFORMS[platform];
	}

	stats(platform, user, region) {
		return new Promise((resolve, reject) => {
			if (!this._isValidPlatform(platform)) {
				return reject(new Error("Invalid Platform"));
			}

			if (!user) {
				console.log("user");
				return reject(new Error("Username not specified."));
			}
			if (!region) {
				region = "us";
			}
			let plat = config.PLATFORMS[platform];
			let url = config.BASE_URL.replace(/{{platform}}/i, platform)
				.replace(/{{region}}/i, region || "us")
				.replace(/{{battletag}}/i, user.replace(/\#/i, "-"));

			let options = {
				method: "GET",
				url: url,
				headers: {},
				qs: undefined,
				json: true
			};

			return request(options)
				.then(stats => {
					return resolve(stats);
				}).catch( (err) => {
					return reject(err);
				});
		});
	}
}

module.exports = OverwatchApi;
