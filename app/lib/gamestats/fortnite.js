"use strict";
const request = require("request-promise");

const API_URL = "https://api.fortnitetracker.com/v1/profile";
const platforms = {
	pc: "pc",
	xbl: "xbl",
	psn: "psn"
};
class FortniteApi {
	constructor(settings) {
		this.API_KEY = settings.API_KEY;
	}

	stats(platform, epicUser) {
		return new Promise( (resolve, reject) => {
			if (!platform || !platforms[platform]) {
				return reject(new Error("Unknown platform specified."));
			}
			if (!epicUser) {
				return reject(new Error("EPIC Username not specified."));
			}
			let url = `${API_URL}/${platforms[platform]}/${epicUser}`;
			let options = {
				method: "GET",
				url: url,
				headers: {
					"TRN-Api-Key": this.API_KEY
				},
				qs: undefined,
				json: true // Automatically parses the JSON string in the response
			};

			return request(options)
				.then((body) => {
					return resolve(body);
				})
				.catch((err) => {
					console.err(err);
					return reject(err);
				});
		});
	}
}

module.exports = FortniteApi;
