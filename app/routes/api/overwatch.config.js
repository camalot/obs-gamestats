"use strict";

const xconfig = require("../../config");
const merge = require("merge");

let config = {
	"api/overwatch": {
		route: "/api/overwatch"
	}
};

module.exports = merge(xconfig, config);
