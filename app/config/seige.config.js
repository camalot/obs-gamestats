// https://api.r6stats.com/api/v1/players/{}?platform={}
'use strict';
let result = {
	seige: {
		PLATFORMS: {
			xbl: "xone",
			psn: "ps4",
			pc: "uplay"
		},
		MODES: {
			ranked: "ranked",
			casual: "casual"
		},
		BASE_URL: "https://api.r6stats.com/api/v1/players",
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000
	}
};

module.exports = result;
