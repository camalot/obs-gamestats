"use strict";

const xconfig = require("../../config");
const merge = require("merge");

let config = {
	"api/seige": {
		route: "/api/seige"
	}
};

module.exports = merge(xconfig, config);
