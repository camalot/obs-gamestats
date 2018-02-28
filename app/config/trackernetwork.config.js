
'use strict';
const npmpackage = require("../../package.json");
let result = {
	GAMESTATS: {
		BRAIN_KEY: "OBS-GAMESTATS",
		VERSION: npmpackage.version,
		TITLE: "OBS-GAMESTATS",
		URL: npmpackage.homepage
	}
};

module.exports = result;
