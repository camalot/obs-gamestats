"use strict";

const xconfig = require("../../config");
const merge = require("merge");

let config = {
	"api/fortnite": {
		route: "/api/fortnite"
	}
};

module.exports = merge(xconfig, config);
