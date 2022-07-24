'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getScrollBarWidth = getScrollBarWidth;
exports.calcOffset = calcOffset;
function getScrollBarWidth() {
	var scrollDiv = document.createElement('div');
	scrollDiv.className = 'react-timekeeper-scrollbar-measure';
	document.body.appendChild(scrollDiv);
	var width = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	document.body.removeChild(scrollDiv);
	return width;
}

function calcOffset(el, clientX, clientY) {
	var style = el.currentStyle || window.getComputedStyle(el, null);
	var borderLeftWidth = parseInt(style['borderLeftWidth'], 10) || 0;
	var borderTopWidth = parseInt(style['borderTopWidth'], 10) || 0;
	var rect = el.getBoundingClientRect();

	return {
		offsetX: clientX - borderLeftWidth - rect.left,
		offsetY: clientY - borderTopWidth - rect.top
	};
}