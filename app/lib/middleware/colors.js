"use strict";
const config = require("../../config");
module.exports = (req, res, next) => {
	res.locals.colors = config.colors;
	let regex = /^(?:(?:deep-)(?:orange|purple)|(?:light-)(?:blue|green)|red|pink|purple|indigo|blue|cyan|teal|green|lime|yellow|amber|orange|brown|grey|blue-grey)(?:-A?(?:50|[1-9]00))?|black|white$/;
	let color = req.query["colors.label"];
	if (color) {
		if (regex.test(color)) {
			res.locals.colors.label = color;
		}
	}

	color = req.query["colors.value"];
	if (color) {
		if (regex.test(color)) {
			res.locals.colors.value = color;
		}
	}

	next();
};
