'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = parseTime;
var TIME_PARSE_MERIDIEM = new RegExp(/^(\d{1,2}?):(\d{2}?)\s?(am|pm)$/i);
var TIME_PARSE_24 = new RegExp(/^(\d{1,2}?):(\d{2}?)$/);

var defaultTime = {
	hour: 12,
	minute: 0,
	meridiem: 'pm'

	// parse and normalize time to 12h format with meridiem
};function parseTime(time) {
	time = time || defaultTime;

	var hour = void 0;
	var minute = void 0;
	var meridiem = 'am';

	if (typeof time === 'string') {
		// if is string
		var match = time.match(TIME_PARSE_MERIDIEM);
		if (match) {
			hour = parseInt(match[1], 10);
			minute = parseInt(match[2], 10);
			meridiem = match[3].toLowerCase();
		} else {
			match = time.match(TIME_PARSE_24);
			if (!match) {
				throw new Error('Could not parse time (string)');
			}
			minute = parseInt(match[2], 10);
			var h = parseInt(match[1], 10);

			var _handle = handle24(h);

			hour = _handle.hour;
			meridiem = _handle.meridiem;
		}
		if (hour === 0) {
			// if 0:32, should be 12:32 am
			hour = 12;
		}
	} else if ((typeof time === 'undefined' ? 'undefined' : _typeof(time)) === 'object') {
		// if is object
		if (!Number.isInteger(time.hour) || !Number.isInteger(time.minute)) {
			throw new Error('Time and minute must both be valid integers');
		}
		minute = time.minute;
		if (time.meridiem) {
			hour = handle12(time.hour);
			meridiem = time.meridiem;
		} else {
			var _handle2 = handle24(time.hour);

			hour = _handle2.hour;
			meridiem = _handle2.meridiem;
		}
	}

	if (hour > 12 || minute > 60) {
		throw new Error('Time out of range');
	}

	return {
		hour: hour,
		minute: minute,
		meridiem: meridiem
	};
}

function handle12(hour) {
	if (hour > 12) {
		throw new Error('Hour out of range (' + hour + ' > 12)');
	}
	if (hour === 0) {
		hour = 12;
	}
	return hour;
}

function handle24(hour) {
	var meridiem = 'am';
	if (hour > 24) {
		throw new Error('Hour out of range (> 24)');
	}
	if (hour === 24) {
		hour = 12;
	} else if (hour > 11) {
		meridiem = 'pm';
		if (hour > 12) {
			hour = hour % 12;
		}
	}
	return { hour: hour, meridiem: meridiem };
}