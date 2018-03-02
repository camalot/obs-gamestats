'use strict';

let _hasValue = (array, value) => {
	return array.indexOf(value) >= 0;
};


module.exports = {
	hasValue: _hasValue
}
