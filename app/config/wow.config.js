'use strict';
let result = {
	wow: {
		API_KEY: process.env.BN_API_KEY,
		BASE_URL: "https://us.api.battle.net/wow",
		STATS_URL: "{{BASE_URL}}/character/{{REALM}}/{{CHARACTER}}?fields=stats&locale={{LOCALE}}&apikey={{API_KEY}}",
		DATA_URL: "{{BASE_URL}}/data/character/{{DATAROLE}}?locale={{LOCALE}}&apikey={{API_KEY}}",
		DATA_ROLES: {
			races: "races",
			classes: "classes"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000

	}
};

module.exports = result;
