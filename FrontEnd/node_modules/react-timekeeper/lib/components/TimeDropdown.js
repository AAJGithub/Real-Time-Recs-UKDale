'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.TimeDropdown = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _animations = require('../helpers/animations');

var _dom = require('../helpers/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scrollbarWidth = void 0;

var TimeDropdown = exports.TimeDropdown = function (_React$Component) {
	_inherits(TimeDropdown, _React$Component);

	function TimeDropdown(props) {
		_classCallCheck(this, TimeDropdown);

		var _this = _possibleConstructorReturn(this, (TimeDropdown.__proto__ || Object.getPrototypeOf(TimeDropdown)).call(this, props));

		_this.elsewhereClick = _this.elsewhereClick.bind(_this);
		_this.selectTime = _this.selectTime.bind(_this);
		return _this;
	}

	_createClass(TimeDropdown, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.container.scrollTop = this.selected.offsetTop;

			if (!scrollbarWidth) {
				scrollbarWidth = (0, _dom.getScrollBarWidth)();
			}

			document.addEventListener('click', this.elsewhereClick, false);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			document.removeEventListener('click', this.elsewhereClick, false);

			this.enableBodyScroll();
		}
	}, {
		key: 'elsewhereClick',
		value: function elsewhereClick(e) {
			var parent = this.container;
			var child = e.target;

			var node = child.parentNode;
			while (node != null) {
				if (node === parent) {
					return;
				}
				node = node.parentNode;
			}
			this.props.close();
		}
	}, {
		key: 'selectTime',
		value: function selectTime(val) {
			// select time
			this.props.updateVal(val);

			// then close
			this.props.close();
		}
	}, {
		key: 'disableBodyScroll',
		value: function disableBodyScroll() {
			document.documentElement.style.paddingRight = scrollbarWidth + 'px';
			document.documentElement.classList.add('react-timekeeper-noscroll');
		}
	}, {
		key: 'enableBodyScroll',
		value: function enableBodyScroll() {
			document.documentElement.style.paddingRight = 0;
			document.documentElement.classList.remove('react-timekeeper-noscroll');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var props = this.props;
			var config = props.config;
			var styles = {
				wrapper: {
					position: 'absolute',
					display: 'inline-block',
					background: 'white',
					border: '1px solid ' + config.DROPDOWN_BORDER,
					borderRadius: '2px',
					padding: '6px 0',
					zIndex: '20',
					top: 62,
					height: '250px',
					overflowY: 'auto',
					boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
					opacity: 0,
					animation: 'x 0.2s ease-out both',
					animationName: _animations.fadeIn
				},
				'wrapper-hour': {
					right: -22
				},
				'wrapper-minute': {
					left: -10
				},
				options: {
					position: 'relative',
					listStyle: 'none',
					padding: 0,
					margin: 0
				},
				option: {
					background: 'transparent',
					padding: '7px 30px',
					fontSize: '16px',
					color: config.DROPDOWN_COLOR,
					cursor: 'pointer',
					':hover': {
						background: config.DROPDOWN_SELECTED_COLOR
					}
				}
			};

			var val = props.val.toString();

			return _react2.default.createElement(
				'div',
				{
					style: [styles.wrapper, styles['wrapper-' + props.type]],
					ref: function ref(el) {
						return _this2.container = el;
					},
					onMouseEnter: this.disableBodyScroll,
					onMouseLeave: this.enableBodyScroll,
					className: 'react-timekeeper__time-dropdown'
				},
				_react2.default.createElement(
					'ul',
					{
						style: styles.options,
						className: 'react-timekeeper__time-dropdown-options'
					},
					this.props.options.map(function (opt) {
						return _react2.default.createElement(
							'li',
							{
								key: opt,
								style: _extends({}, styles.option, {
									background: opt === val ? config.DROPDOWN_SELECTED_COLOR : ''
								}),
								ref: function ref(el) {
									opt === val ? _this2.selected = el : '';
								},
								onClick: function onClick() {
									return _this2.selectTime(opt);
								}
							},
							opt
						);
					})
				)
			);
		}
	}]);

	return TimeDropdown;
}(_react2.default.Component);

TimeDropdown.propTypes = {
	config: _propTypes2.default.object.isRequired,
	val: _propTypes2.default.number.isRequired,
	options: _propTypes2.default.array.isRequired,
	close: _propTypes2.default.func.isRequired,
	updateVal: _propTypes2.default.func.isRequired
};

exports.default = (0, _radium2.default)(TimeDropdown);