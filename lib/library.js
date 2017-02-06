(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("library", [], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory();
	else
		root["library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var defaults = {
    format: 'D M YYYY',
    displayFormat: 'dddd, MMMM Do YYYY',
    submitFormat: 'YYYY-MM-DD',
    allowInput: true,
    tabFill: true,
    showClear: true,
    steps: {},
    debounceWait: 4000,
    holdInterval: 50,
    defaultDate: moment()
};

exports.default = defaults;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = __webpack_require__(0);

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sweetDatePickers = [];

var SweetDatePicker = function () {
    function SweetDatePicker(input) {
        var _this = this;

        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _defaults2.default;

        _classCallCheck(this, SweetDatePicker);

        console.log(_defaults2.default, config, 'll');

        sweetDatePickers.push(this);

        this.settings = config;

        // Stop people on touch devices accidentally clicking a number
        // instead of the arrow
        if (SweetDatePicker.isTouch()) {
            this.settings.allowInput = false;
        }

        this.parts = [];

        this.input = input;

        this.activePart = -1;

        this.initializeDate();

        this.constrainMax();

        this.initialized = false;

        this.input.onclick = function (e) {
            _this.show();
            e.target.blur();
        };
    }

    // Get the raw value from the input


    _createClass(SweetDatePicker, [{
        key: 'getValue',
        value: function getValue() {

            if (this.input.getAttribute('data-value')) {
                return this.input.getAttribute('data-value');
            }

            if (this.input.value.length > 0) {
                return this.value;
            }
        }
    }, {
        key: 'assign',
        value: function assign(value) {
            if (value instanceof moment) {
                this._dateMoment = value;
            } else {
                this._dateMoment = moment(value, this.settings.submitFormat);
            }
        }
    }, {
        key: 'initializeDate',
        value: function initializeDate() {
            var rawValue = this.getValue();
            if (rawValue) {
                this.assign(rawValue);
            }

            if (!this._dateMoment || !this._dateMoment.isValid()) {
                this.assign(this.settings.defaultDate);
            }
        }
    }, {
        key: 'constrainMax',
        value: function constrainMax() {
            if (this.settings.maxDate && this.settings.maxDate < this._dateMoment) {
                this._dateMoment = this.settings.maxDate;
            }
        }
    }, {
        key: 'show',
        value: function show() {

            if (!this.initialized) {
                this.initializeModal();
                this.initializeForm();
            }

            SweetDatePickerBackdrop.show();
        }
    }, {
        key: 'initializeModal',
        value: function initializeModal() {
            var _this2 = this;

            this.buildModal();

            // Create the parts
            var formatParts = this.settings.format.split(' ');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var format = _step.value;


                    var part = new SweetDatePickerPart(_this2, format);

                    _this2.parts.push(part);

                    var index = _this2.parts.length - 1;

                    part.setPosition(index);

                    if (_this2.settings.steps[format]) {
                        part.setSteps(_this2.settings.steps[format]);
                    }

                    part.addListener('input', function (e) {
                        if (_this2.settings.tabFill && e.target.value.length == part.part.inputLength && index < formatParts.length) {
                            _this2.nextPart();
                        }
                    });

                    part.addListener('focus', function () {
                        return _this2.activePart = index;
                    });

                    part.addListener('update', function (date) {
                        _this2._dateMoment = date;

                        // Trigger all the parts to update their UI
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = _this2.parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _part = _step2.value;

                                _part.update();
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }
                    });

                    // TODO - don't like need ref to container
                    _this2.modal.querySelector('.sdp-container').appendChild(part.render());
                };

                for (var _iterator = formatParts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'initializeForm',
        value: function initializeForm() {
            this.submitInput = SweetDatePickerRenderer.render('input');
            this.submitInput.setAttribute('type', 'hidden');
            this.submitInput.setAttribute('name', this.input.getAttribute('name'));
            this.input.parentNode.appendChild(this.submitInput);
            this.input.removeAttribute('name');
        }
    }, {
        key: 'nextPart',
        value: function nextPart() {
            var next = this.activePart + 1;

            if (next >= this.parts.length) {
                return false;
            }

            this.parts[next].focus();
        }
    }, {
        key: 'buildModal',
        value: function buildModal() {
            var _this3 = this;

            this.modal = SweetDatePickerRenderer.render('div.sdp-modal.hide');
            if (this.constructor.isTouch()) {
                this.modal.classList.add('touch');
            }

            var closeBtn = SweetDatePickerRenderer.render('button.close');
            closeBtn.onclick = function () {
                return _this3.constructor.hide();
            };
            this.modal.appendChild(closeBtn);

            var container = SweetDatePickerRenderer.render('div.sdp-container');

            this.modal.appendChild(container);

            // Actions
            var actionContainer = SweetDatePickerRenderer.render('div.sdp-actions');
            var clearBtnWrapper = SweetDatePickerRenderer.render('div.sdp-btn-wrapper');
            var clearBtn = SweetDatePickerRenderer.render('button.sdp-clear');
            var setBtnWrapper = SweetDatePickerRenderer.render('div.sdp-btn-wrapper');
            var setBtn = SweetDatePickerRenderer.render('button.sdp-set');

            clearBtnWrapper.appendChild(clearBtn);
            setBtnWrapper.appendChild(setBtn);

            clearBtn.innerText = 'Clear';

            setBtn.innerText = 'Set';

            if (this.settings.showClear) {
                actionContainer.appendChild(clearBtnWrapper);
                clearBtn.onclick = function () {
                    return _this3.clear();
                };
            }

            actionContainer.appendChild(setBtnWrapper);

            setBtn.onclick = function () {
                _this3.input.value = _this3._dateMoment.format(_this3.settings.displayFormat);
                _this3.submitInput.value = _this3._dateMoment.format(_this3.settings.submitFormat);
                _this3.constructor.hide();
            };

            this.modal.appendChild(actionContainer);

            document.querySelector('body').appendChild(this.modal);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.input.value = '';
            this.submitInput.value = '';
            this.constructor.hide();
            //TODO - Implement clear event
        }
    }], [{
        key: 'isTouch',
        value: function isTouch() {
            return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
        }
    }, {
        key: 'supportsTouch',
        value: function supportsTouch() {
            return 'ontouchstart' in window;
        }
    }, {
        key: 'hide',
        value: function hide() {
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = sweetDatePickers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var picker = _step3.value;

                    picker.modal.classList.add('hide');
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                        _iterator3.return();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }

            SweetDatePickerBackdrop.hide();
        }
    }]);

    return SweetDatePicker;
}();

exports.default = SweetDatePicker;

var SweetDatePickerPart = function () {
    function SweetDatePickerPart(picker, format) {
        _classCallCheck(this, SweetDatePickerPart);

        this.picker = picker;

        this.listeners = new Map();

        var table = {
            'YYYY': { unit: 'year', inputLength: 4 },
            'YY': { unit: 'year', inputLength: 2 },
            'M': { unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1 },
            'MM': { unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1 },
            'MMM': { unit: 'month', inputLength: 3, numeric: false, modifier: 1 },
            'MMMM': { unit: 'month', inputLength: 8, numeric: false, modifier: 1 },
            'D': { unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date' },
            'DD': { unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date' },
            'DDD': { unit: 'day', inputLength: 3, numeric: false, method: 'date' },
            'DDDD': { unit: 'day', inputLength: 9, numeric: false, method: 'date' },
            'H': { unit: 'hour', caption: 'Hours', inputLength: 2 },
            'HH': { unit: 'hour', caption: 'Hours', inputLength: 2 },
            'h': { unit: 'hour', caption: 'Hours', inputLength: 2 },
            'hh': { unit: 'hour', caption: 'Hours', inputLength: 2 },
            'm': { unit: 'minute', caption: 'Minutes', inputLength: 2 },
            'mm': { unit: 'minute', caption: 'Minutes', inputLength: 2 },
            's': { unit: 'second', caption: 'Seconds', inputLength: 2 },
            'ss': { unit: 'second', caption: 'Seconds', inputLength: 2 }
        };

        var defaults = {
            caption: null,
            captionFormat: null,
            numeric: true,
            modifier: 0,
            el: null,
            step: 1,
            inputLength: null,
            format: format
        };

        var lookup = table[format] || null;

        if (!lookup) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }

        this.part = Object.assign({}, defaults, lookup);

        this.elements = {};

        if (!this.part.method) this.part.method = this.part.unit;
    }

    _createClass(SweetDatePickerPart, [{
        key: 'setPosition',
        value: function setPosition(position) {
            this.position = position;
        }
    }, {
        key: 'setSteps',
        value: function setSteps(steps) {
            this.part.step = steps;
        }
    }, {
        key: 'focus',
        value: function focus() {
            console.log('focus', this.elements.metric);
            this.elements.metric.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            var element = SweetDatePickerRenderer.render('div.sdp-date-segment-col');
            var segment = SweetDatePickerRenderer.render('div.sdp-date-segment');

            element.appendChild(segment);

            this.elements = {
                up: segment.appendChild(SweetDatePickerRenderer.render('button.up')),
                metric: segment.appendChild(SweetDatePickerRenderer.render('input.metric')),
                comment: segment.appendChild(SweetDatePickerRenderer.render('div.comment')),
                down: segment.appendChild(SweetDatePickerRenderer.render('button.down'))
            };

            new SweetDatePickerPushHoldEvent(this.elements.up, function () {
                _this4.value = _this4.value.numeric + _this4.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            new SweetDatePickerPushHoldEvent(this.elements.down, function () {
                _this4.value = _this4.value.numeric - _this4.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            // TODO, picker send part settings over to part class rather than me referencing them up the tree here.

            if (this.picker.settings.allowInput && this.part.numeric) {

                this.elements.metric.oninput = function (e) {

                    if (!_this4.validate(e.target.value)) {
                        _this4.emit('validation-failed', e);
                    }
                    ;

                    _this4.emit('input', e);
                };

                this.elements.metric.onfocus = function (e) {
                    return _this4.emit('focus', e);
                };

                this.elements.metric.onkeypress = function (e) {
                    return _this4.emit('keypress', e);
                };
            } else {

                this.elements.metric.disabled = true;
            }

            this.bindEvents();

            // Initialise the values
            this.update();

            return element;
        }

        // Updates the segment with the appropriate values

    }, {
        key: 'update',
        value: function update() {
            this.elements.metric.value = this.value.display;
            if (this.part.captionFormat) {
                this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
            } else if (this.part.caption) {
                this.elements.comment.innerText = this.part.caption;
            }
        }
    }, {
        key: 'validate',
        value: function validate(value) {

            // Only validate if we have enough input to go on
            if (value.length < this.part.inputLength) {
                return true;
            }

            value = parseInt(value) - this.part.modifier;

            var testDate = moment(this.picker._dateMoment)[this.part.method](value);

            return testDate[this.part.method]() === value;
        }
    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this5 = this;

            var originalInput = this.value.display;

            this.addListener('input', function (e) {
                // Only set the value once the user has entered the whole value
                // otherwise moment may not be able to parse full date
                if (e.target.value.length >= _this5.part.inputLength) {
                    _this5.value = e.target.value;
                    e.target.blur();
                }
            });

            this.addListener('focus', function (e) {
                return e.target.select();
            });

            this.addListener('keypress', function (e) {
                var charCode = e.which || e.keyCode;
                originalInput = e.target.value;
                return !(charCode > 31 && (charCode < 48 || charCode > 57));
            });

            this.addListener('validation-failed', function (e) {
                e.target.value = originalInput;

                e.target.classList.add('error');

                setTimeout(function () {
                    return e.target.classList.remove('error');
                }, 1000);
            });
        }

        /*
         Events
         This would ideally be a trait, however traits are not a thing in ES6.
         Roll on ES7
         */

    }, {
        key: 'addListener',
        value: function addListener(label, callback) {
            this.listeners.has(label) || this.listeners.set(label, []);
            this.listeners.get(label).push(callback);
        }
    }, {
        key: 'emit',
        value: function emit(label) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            var listeners = this.listeners.get(label);

            if (listeners && listeners.length) {
                listeners.forEach(function (listener) {
                    listener.apply(undefined, args);
                });
                return true;
            }
            return false;
        }
    }, {
        key: 'value',
        get: function get() {
            return {
                display: this.picker._dateMoment.format(this.part.format),
                numeric: parseInt(this.picker._dateMoment[this.part.method]() + this.part.modifier)
            };
        },
        set: function set(value) {

            value -= this.part.modifier;

            var newDate = moment(this.picker._dateMoment)[this.part.method](value);

            if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
                return;
            }

            this.emit('update', newDate);

            //this.picker._dateMoment = newDate;
            this.update();
        }
    }]);

    return SweetDatePickerPart;
}();

var SweetDatePickerBackdrop = function () {
    function SweetDatePickerBackdrop() {
        _classCallCheck(this, SweetDatePickerBackdrop);
    }

    _createClass(SweetDatePickerBackdrop, null, [{
        key: 'getElement',
        value: function getElement() {
            return document.getElementsByClassName('sdp-backdrop')[0] || null;
        }
    }, {
        key: 'show',
        value: function show() {
            if (!this.getElement()) {
                this.render();
            } else {
                this.getElement().classList.remove('hidden');
            }
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.getElement().classList.add('hide');
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var element = document.createElement('div');
            element.className = 'sdp-backdrop';
            element.onclick = function () {
                return _this6.hide();
            };
            document.querySelector('body').appendChild(element);
        }
    }]);

    return SweetDatePickerBackdrop;
}();

var SweetDatePickerRenderer = function () {
    function SweetDatePickerRenderer() {
        _classCallCheck(this, SweetDatePickerRenderer);
    }

    _createClass(SweetDatePickerRenderer, null, [{
        key: 'render',
        value: function render(selector) {
            var attributes = selector.split('.');
            var elementName = attributes.shift();
            var element = document.createElement(elementName);

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = attributes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var className = _step4.value;

                    element.classList.add(className);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return element;
        }
    }]);

    return SweetDatePickerRenderer;
}();

var SweetDatePickerPushHoldEvent = function () {
    function SweetDatePickerPushHoldEvent(target, callback, holdInterval, debounceWait) {
        var _this7 = this;

        _classCallCheck(this, SweetDatePickerPushHoldEvent);

        this.target = target;

        this.callback = callback;

        this.interval = holdInterval;

        this.debounce = debounceWait;

        this._executed = false;

        this._intervalTimer = null;

        this._timer = null;

        var startEvents = SweetDatePicker.supportsTouch() ? ['ontouchstart', 'onmousedown'] : ['onmousedown'];
        this._bindEvent(this.target, startEvents, function (e) {
            _this7._mouseDown(e);
        });

        var endEvents = SweetDatePicker.supportsTouch() ? ['ontouchend', 'onmouseup'] : ['onmouseup'];
        this._bindEvent(this.target, endEvents, function (e) {
            _this7._mouseUp(e);
        });
    }

    _createClass(SweetDatePickerPushHoldEvent, [{
        key: '_mouseDown',
        value: function _mouseDown(e) {
            var _this8 = this;

            // Only fire 1 event
            e.preventDefault();

            this._timer = setTimeout(function () {

                _this8._executed = true;

                _this8._intervalTimer = setInterval(function () {
                    _this8.callback();
                }, _this8.interval);
            }, this.debounce);
        }
    }, {
        key: '_mouseUp',
        value: function _mouseUp(e) {

            // Only fire 1 event
            e.preventDefault();

            this._clear();

            if (!this._executed) {
                // Simulate click as we steal the event
                this.callback();
            }

            this._executed = false;
        }
    }, {
        key: '_clear',
        value: function _clear() {
            if (this._timer !== null) {
                clearTimeout(this._timer);
                this._timer = null;
            }
            if (this._intervalTimer !== null) {
                clearTimeout(this._intervalTimer);
                this._intervalTimer = null;
            }
        }
    }, {
        key: '_bindEvent',
        value: function _bindEvent(element, events, callback) {
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = events[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var event = _step5.value;

                    element[event] = function (e) {
                        callback(e);
                    };
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
    }]);

    return SweetDatePickerPushHoldEvent;
}();

if (typeof window !== 'undefined') {
    window.SweetDatePicker = window.sdp = SweetDatePicker;
} else {
    alert('Sweet Date Picker is a frontend module and requires the window var.');
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=library.js.map