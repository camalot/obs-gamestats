// https://pubgtracker.com/site-api

'use strict';
let result = {
	pubg: {
		API_KEY: process.env.TN_PUBG_API_KEY,
		MODES: {
			all: "lifeTimeStats",
			solo: "p2",
			squad: "p9",
			duo: "p10",
			"solo-fpp": "solo-fpp",
			"duo-fpp": "duo-fpp",
			"squad-fpp": "squad-fpp"

		},
		REGIONS: {
			na: "na",
			eu: "eu",
			as: "as",
			oc: "oc",
			sa: "sa",
			sea: "sea",
			krjp: "krjp"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000

	}
};

module.exports = result;
