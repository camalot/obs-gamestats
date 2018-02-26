
'use strict';
let result = {
	fortnite: {
		// https://fortnitetracker.com/site-api
		API_KEY: process.env.TN_FORTNITE_API_KEY,
		MODES: {
			all: "lifeTimeStats",
			solo: "p2",
			squad: "p9",
			duo: "p10",
			season: {
				solo: "curr_p2",
				squad: "curr_p9",
				duo: "curr_p10"
			}
		},
		LABEL_TO_FIELD: {
			"killspermin": "kpm",
			"killspermatch": "kpg",
			"matchesplayed": "matches"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000

	}
};

module.exports = result;
