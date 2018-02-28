"use strict";
const config = require("../../config");
module.exports = (req, res, next) => {
	res.locals.colors = config.colors;

	if ( req.query["colors.label"] ) {
		res.locals.colors.label = req.query["colors.label"];
	}

	if (req.query["colors.value"]) {
		res.locals.colors.value = req.query["colors.value"];
	}

	next();
};
