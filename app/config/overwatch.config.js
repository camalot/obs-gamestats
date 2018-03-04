// https://ow-api.com/v1/stats/:platform/:region/:battletag/profile
'use strict';
let result = {
	overwatch: {
		BASE_URL:
			"https://ow-api.com/v1/stats/{{platform}}/{{region}}/{{battletag}}/profile",
		REGIONS: {
			us: "us",
			eu: "eu",
			asia: "asia"
		},
		PLATFORMS: {
			pc: "pc",
			xbl: "xbl",
			psn: "psn"
		},
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000,
		FIELDS: {
			ranked_eliminations: "Ranked Eliminations Avg",
			ranked_damagedone: "Ranked Damage Avg",
			ranked_deaths: "Ranked Deaths Avg",
			ranked_finalblows: "Ranked Final Blows Avg",
			ranked_healingdone: "Ranked Healing Avg",
			ranked_objectivekills: "Ranked Objective Kills Avg",
			ranked_matches: "Ranked Matches",
			ranked_kills: "Ranked Kills",
			ranked_wins: "Ranked Wins",
			ranked_medals: "Ranked Total Medals",
			ranked_medals_bronze: "Ranked Bronze Medals",
			ranked_medals_silver: "Ranked Silver Medals",
			ranked_medals_gold: "Ranked Gold Medals",

			eliminations: "Eliminations Avg",
			damagedone: "Damage Avg",
			deaths: "Deaths Avg",
			finalblows: "Final Blows Avg",
			healingdone: "Healing Avg",
			objectivekills: "Objective Kills Avg",
			matches: "Matches",
			kills: "Kills",
			wins: "Wins",
			medals: "Total Medals",
			medals_bronze: "Bronze Medals",
			medals_silver: "Silver Medals",
			medals_gold: "Gold Medals",

			level: "Level",
			prestige: "Prestige",
			rating: "Rating",
			total_wins: "Total Wins"
		}
	}
};

module.exports = result;
