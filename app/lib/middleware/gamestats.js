"use strict";
const config = require("../../config");
module.exports = (req, res, next) => {
	res.locals.GAMESTATS = config.GAMESTATS;
	next();
};
