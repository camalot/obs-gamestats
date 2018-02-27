// https://pubgtracker.com/site-api

'use strict';
let result = {
	battlefield: {
		API_KEY: process.env.TN_BATTLEFIELD_API_KEY,
		PLATFORMS: {
			xbl: 1,
			psn: 2,
			pc: 3
		},
		GAMES: {
			bf1: "tunguska",
			bf4: "bf4"
		},
		BASE_URL: "https://battlefieldtracker.com/bf1/api/{{ENDPOINT}}?platform={{PLATFORM}}&personaId={{PERSONAID}}&game={{GAME}}",
		ENDPOINTS: {
			stats: "Stats/BasicStats",
			details: "Stats/DetailedStats",
			career: "Stats/CareerForOwnedGames"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000

	}
};

module.exports = result;
