// https://ow-api.com/v1/stats/:platform/:region/:battletag/profile
'use strict';
let result = {
	overwatch: {
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
			us: "us",
			eu: "eu",
			asia: "asia"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000

	}
};

module.exports = result;
