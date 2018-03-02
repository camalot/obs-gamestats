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
		FIELDS: {
			ranked_wins: "Ranked Wins",
			ranked_losses: "Ranked Losses",
			ranked_wins_: "Ranked Wins %",
			ranked_kills: "Ranked Kills",
			ranked_deaths: "Ranked Deaths",
			ranked_kd: "Ranked K/d",
			ranked_timeplayed: "Ranked Time Played",

			wins: "Casual Wins",
			losses: "Casual Losses",
			wins_: "Casual Wins %",
			kills: "Casual Kills",
			deaths: "Casual Deaths",
			kd: "Casual K/d",
			timeplayed: "Casual Time Played",

			season: "Season",
			season_wins: "Season Wins",
			season_losses: "Season Losses",


			revives: "Revives",
			suicides: "Suicides",
			headshots: "Headshots",
			assists: "Assists",
			bulletsfired: "Shots Fired",
			bulletshit: "Shots Hit",

			rank: "Rank",
			level: "Level",
			xp: "XP"

		},
		BASE_URL: "https://api.r6stats.com/api/v1/players",
		// seconds to poll
		POLL_DELAY: parseInt(process.env.TN_POLL_DELAY || "60", 0) * 1000
	}
};

module.exports = result;
