'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = composeTime;
function composeTime(hour, minute, meridiem) {
	var paddedMinute = ('0' + minute).slice(-2);

	var hour24 = hour;
	if (meridiem === 'pm' && hour !== 12) {
		hour24 = hour + 12;
	} else if (meridiem === 'am' && hour === 12) {
		hour24 = 0;
	}

	return {
		formatted: hour + ':' + paddedMinute + ' ' + meridiem,
		formattedSimple: hour + ':' + paddedMinute,
		formatted24: hour24 + ':' + paddedMinute,
		hour: hour,
		hour24: hour24,
		minute: minute,
		meridiem: meridiem
	};
}