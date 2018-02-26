
'use strict';
const npmpackage = require("../../package.json");
let result = {
	trackernetwork: {
		BRAIN_KEY: "OBS-TRACKERNETWORK",
		VERSION: npmpackage.version,
		TITLE: "TrackerNetwork",
		URL: npmpackage.homepage,
	}
};

module.exports = result;
