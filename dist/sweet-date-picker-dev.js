;(function(window, document, undefined) {
    "use strict";

    (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Backdrop = function () {
    function Backdrop() {
        _classCallCheck(this, Backdrop);
    }

    _createClass(Backdrop, null, [{
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
                this.getElement().classList.remove('hide');
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
            var element = document.createElement('div');
            element.className = 'sdp-backdrop';
            element.onclick = function () {
                return SweetDatePicker.hide();
            };
            document.querySelector('body').appendChild(element);
        }
    }]);

    return Backdrop;
}();

exports.default = Backdrop;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isTouch = function isTouch() {
    return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
};

var supportsTouch = function supportsTouch() {
    return 'ontouchstart' in window;
};

exports.isTouch = isTouch;
exports.supportsTouch = supportsTouch;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render2 = require('./render');

var _render3 = _interopRequireDefault(_render2);

var _pushHoldEvent = require('./push-hold-event');

var _pushHoldEvent2 = _interopRequireDefault(_pushHoldEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Part = function () {
    function Part(picker, format) {
        _classCallCheck(this, Part);

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

    _createClass(Part, [{
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
            var _this = this;

            var element = (0, _render3.default)('div.sdp-date-segment-col');
            var segment = (0, _render3.default)('div.sdp-date-segment');

            element.appendChild(segment);

            this.elements = {
                up: segment.appendChild((0, _render3.default)('button.up')),
                metric: segment.appendChild((0, _render3.default)('input.metric')),
                comment: segment.appendChild((0, _render3.default)('div.comment')),
                down: segment.appendChild((0, _render3.default)('button.down'))
            };

            new _pushHoldEvent2.default(this.elements.up, function () {
                _this.value = _this.value.numeric + _this.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            new _pushHoldEvent2.default(this.elements.down, function () {
                _this.value = _this.value.numeric - _this.part.step;
            }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

            // TODO, picker send part settings over to part class rather than me referencing them up the tree here.

            if (this.picker.settings.allowInput && this.part.numeric) {

                this.elements.metric.oninput = function (e) {

                    if (!_this.validate(e.target.value)) {
                        _this.emit('validation-failed', e);
                    }
                    ;

                    _this.emit('input', e);
                };

                this.elements.metric.onfocus = function (e) {
                    return _this.emit('focus', e);
                };

                this.elements.metric.onkeypress = function (e) {
                    return _this.emit('keypress', e);
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
            var _this2 = this;

            var originalInput = this.value.display;

            this.addListener('input', function (e) {
                // Only set the value once the user has entered the whole value
                // otherwise moment may not be able to parse full date
                if (e.target.value.length >= _this2.part.inputLength) {
                    _this2.value = e.target.value;
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

    return Part;
}();

exports.default = Part;
module.exports = exports['default'];

},{"./push-hold-event":5,"./render":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PushHoldEvent = function () {
    function PushHoldEvent(target, callback, holdInterval, debounceWait) {
        var _this = this;

        _classCallCheck(this, PushHoldEvent);

        this.target = target;

        this.callback = callback;

        this.interval = holdInterval;

        this.debounce = debounceWait;

        this._executed = false;

        this._intervalTimer = null;

        this._timer = null;

        var startEvents = (0, _helpers.supportsTouch)() ? ['ontouchstart', 'onmousedown'] : ['onmousedown'];
        this._bindEvent(this.target, startEvents, function (e) {
            _this._mouseDown(e);
        });

        var endEvents = (0, _helpers.supportsTouch)() ? ['ontouchend', 'onmouseup'] : ['onmouseup'];
        this._bindEvent(this.target, endEvents, function (e) {
            _this._mouseUp(e);
        });
    }

    _createClass(PushHoldEvent, [{
        key: '_mouseDown',
        value: function _mouseDown(e) {
            var _this2 = this;

            // Only fire 1 event
            e.preventDefault();

            this._timer = setTimeout(function () {

                _this2._executed = true;

                _this2._intervalTimer = setInterval(function () {
                    _this2.callback();
                }, _this2.interval);
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var event = _step.value;

                    element[event] = function (e) {
                        callback(e);
                    };
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
    }]);

    return PushHoldEvent;
}();

exports.default = PushHoldEvent;
module.exports = exports['default'];

},{"./helpers":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var render = function render(selector) {
    var attributes = selector.split('.');
    var elementName = attributes.shift();
    var element = document.createElement(elementName);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = attributes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var className = _step.value;

            element.classList.add(className);
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

    return element;
};

exports.default = render;
module.exports = exports['default'];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _defaults = require('./modules/defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _render = require('./modules/render');

var _render2 = _interopRequireDefault(_render);

var _backdrop = require('./modules/backdrop');

var _backdrop2 = _interopRequireDefault(_backdrop);

var _part2 = require('./modules/part');

var _part3 = _interopRequireDefault(_part2);

var _helpers = require('./modules/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sweetDatePickers = [];

var SweetDatePicker = function () {
    function SweetDatePicker(input, config) {
        var _this = this;

        _classCallCheck(this, SweetDatePicker);

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, config, _defaults2.default);

        this.listeners = new Map();

        // Stop people on touch devices accidentally clicking a number
        // instead of the arrow
        if ((0, _helpers.isTouch)()) {
            this.settings.allowInput = false;
        }

        this.parts = [];

        this.input = input;

        this.activePart = -1;

        this.initializeDate();

        this.constrainMax();

        this.initializeForm();

        this.updateForm();

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

            console.log(rawValue, this.settings.defaultDate, this.input.getAttribute('data-value'));

            this.assign(rawValue || this.settings.defaultDate || this.input.getAttribute('data-value'));

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
            }

            _backdrop2.default.show();
            this.modal.classList.remove('hide');
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


                    var part = new _part3.default(_this2, format);

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
            this.submitInput = (0, _render2.default)('input');
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

            this.modal = (0, _render2.default)('div.sdp-modal.hide');
            if ((0, _helpers.isTouch)()) {
                this.modal.classList.add('touch');
            }

            var closeBtn = (0, _render2.default)('button.close');
            closeBtn.onclick = function () {
                return _this3.constructor.hide();
            };
            this.modal.appendChild(closeBtn);

            var container = (0, _render2.default)('div.sdp-container');

            this.modal.appendChild(container);

            // Actions
            var actionContainer = (0, _render2.default)('div.sdp-actions');
            var clearBtnWrapper = (0, _render2.default)('div.sdp-btn-wrapper');
            var clearBtn = (0, _render2.default)('button.sdp-clear');
            var setBtnWrapper = (0, _render2.default)('div.sdp-btn-wrapper');
            var setBtn = (0, _render2.default)('button.sdp-set');

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
                _this3.updateForm();
                _this3.constructor.hide();
            };

            this.modal.appendChild(actionContainer);

            document.querySelector('body').appendChild(this.modal);
        }
    }, {
        key: 'updateForm',
        value: function updateForm() {
            this.input.value = this._dateMoment.format(this.settings.displayFormat);
            this.submitInput.value = this._dateMoment.format(this.settings.submitFormat);
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.input.value = '';
            this.submitInput.value = '';
            this.constructor.hide();
            //TODO - Implement clear event
        }
    }, {
        key: 'addListener',


        /*
         Events
         This would ideally be a trait, however traits are not a thing in ES6.
         Roll on ES7
         */

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
    }], [{
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

            _backdrop2.default.hide();
        }
    }]);

    return SweetDatePicker;
}();

exports.default = SweetDatePicker;


if (typeof window !== 'undefined') {
    window.SweetDatePicker = window.sdp = SweetDatePicker;
} else {
    alert('Sweet Date Picker is a frontend module and requires the window var.');
}
module.exports = exports['default'];

},{"./modules/backdrop":1,"./modules/defaults":2,"./modules/helpers":3,"./modules/part":4,"./modules/render":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbW9kdWxlcy9iYWNrZHJvcC5qcyIsInNyYy9tb2R1bGVzL2RlZmF1bHRzLmpzIiwic3JjL21vZHVsZXMvaGVscGVycy5qcyIsInNyYy9tb2R1bGVzL3BhcnQuanMiLCJzcmMvbW9kdWxlcy9wdXNoLWhvbGQtZXZlbnQuanMiLCJzcmMvbW9kdWxlcy9yZW5kZXIuanMiLCJzcmMvc3dlZXQtZGF0ZS1waWNrZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixROzs7Ozs7O3FDQUVHO0FBQ2hCLG1CQUFPLFNBQVMsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsS0FBc0QsSUFBN0Q7QUFDSDs7OytCQUVhO0FBQ1YsZ0JBQUksQ0FBQyxLQUFLLFVBQUwsRUFBTCxFQUF3QjtBQUNwQixxQkFBSyxNQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssVUFBTCxHQUFrQixTQUFsQixDQUE0QixNQUE1QixDQUFtQyxNQUFuQztBQUNIO0FBQ0o7OzsrQkFFYTtBQUNWLGlCQUFLLFVBQUwsR0FBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsTUFBaEM7QUFDSDs7O2lDQUVlO0FBQ1osZ0JBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxvQkFBUSxTQUFSLEdBQW9CLGNBQXBCO0FBQ0Esb0JBQVEsT0FBUixHQUFrQjtBQUFBLHVCQUFNLGdCQUFnQixJQUFoQixFQUFOO0FBQUEsYUFBbEI7QUFDQSxxQkFBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFdBQS9CLENBQTJDLE9BQTNDO0FBQ0g7Ozs7OztrQkF2QmdCLFE7Ozs7Ozs7OztBQ0FyQixJQUFJLFdBQVc7QUFDWCxZQUFRLFVBREc7QUFFWCxtQkFBZSxvQkFGSjtBQUdYLGtCQUFjLFlBSEg7QUFJWCxnQkFBWSxJQUpEO0FBS1gsYUFBUyxJQUxFO0FBTVgs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ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tkcm9wIHtcblxuICAgIHN0YXRpYyBnZXRFbGVtZW50KCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2RwLWJhY2tkcm9wJylbMF0gfHwgbnVsbDtcbiAgICB9XG5cbiAgICBzdGF0aWMgc2hvdygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldEVsZW1lbnQoKSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBoaWRlKCkge1xuICAgICAgICB0aGlzLmdldEVsZW1lbnQoKS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHJlbmRlcigpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9ICdzZHAtYmFja2Ryb3AnO1xuICAgICAgICBlbGVtZW50Lm9uY2xpY2sgPSAoKSA9PiBTd2VldERhdGVQaWNrZXIuaGlkZSgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG59IiwibGV0IGRlZmF1bHRzID0ge1xuICAgIGZvcm1hdDogJ0QgTSBZWVlZJyxcbiAgICBkaXNwbGF5Rm9ybWF0OiAnZGRkZCwgTU1NTSBEbyBZWVlZJyxcbiAgICBzdWJtaXRGb3JtYXQ6ICdZWVlZLU1NLUREJyxcbiAgICBhbGxvd0lucHV0OiB0cnVlLFxuICAgIHRhYkZpbGw6IHRydWUsXG4gICAgc2hvd0NsZWFyOiB0cnVlLFxuICAgIHN0ZXBzOiB7fSxcbiAgICBkZWJvdW5jZVdhaXQ6IDQwMDAsXG4gICAgaG9sZEludGVydmFsOiA1MCxcbiAgICBkZWZhdWx0RGF0ZTogbW9tZW50KClcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRzOyIsImxldCBpc1RvdWNoID0gKCkgID0+IHtcbiAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKTtcbn07XG5cbmxldCBzdXBwb3J0c1RvdWNoID0gKCkgPT4ge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG59O1xuXG5leHBvcnQge1xuICAgIGlzVG91Y2gsXG4gICAgc3VwcG9ydHNUb3VjaFxufTsiLCJpbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBQdXNoSG9sZEV2ZW50IGZyb20gJy4vcHVzaC1ob2xkLWV2ZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwaWNrZXIsIGZvcm1hdCkge1xuXG4gICAgICAgIHRoaXMucGlja2VyID0gcGlja2VyO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGNvbnN0IHRhYmxlID0ge1xuICAgICAgICAgICAgJ1lZWVknOiB7dW5pdDogJ3llYXInLCBpbnB1dExlbmd0aDogNH0sXG4gICAgICAgICAgICAnWVknOiB7dW5pdDogJ3llYXInLCBpbnB1dExlbmd0aDogMn0sXG4gICAgICAgICAgICAnTSc6IHt1bml0OiAnbW9udGgnLCBjYXB0aW9uRm9ybWF0OiAnTU1NTScsIGlucHV0TGVuZ3RoOiAyLCBtb2RpZmllcjogMX0sXG4gICAgICAgICAgICAnTU0nOiB7dW5pdDogJ21vbnRoJywgY2FwdGlvbkZvcm1hdDogJ01NTU0nLCBpbnB1dExlbmd0aDogMiwgbW9kaWZpZXI6IDF9LFxuICAgICAgICAgICAgJ01NTSc6IHt1bml0OiAnbW9udGgnLCBpbnB1dExlbmd0aDogMywgbnVtZXJpYzogZmFsc2UsIG1vZGlmaWVyOiAxfSxcbiAgICAgICAgICAgICdNTU1NJzoge3VuaXQ6ICdtb250aCcsIGlucHV0TGVuZ3RoOiA4LCBudW1lcmljOiBmYWxzZSwgbW9kaWZpZXI6IDF9LFxuICAgICAgICAgICAgJ0QnOiB7dW5pdDogJ2RheScsIGNhcHRpb25Gb3JtYXQ6ICdkZGRkJywgaW5wdXRMZW5ndGg6IDIsIG1ldGhvZDogJ2RhdGUnfSxcbiAgICAgICAgICAgICdERCc6IHt1bml0OiAnZGF5JywgY2FwdGlvbkZvcm1hdDogJ2RkZGQnLCBpbnB1dExlbmd0aDogMiwgbWV0aG9kOiAnZGF0ZSd9LFxuICAgICAgICAgICAgJ0RERCc6IHt1bml0OiAnZGF5JywgaW5wdXRMZW5ndGg6IDMsIG51bWVyaWM6IGZhbHNlLCBtZXRob2Q6ICdkYXRlJ30sXG4gICAgICAgICAgICAnRERERCc6IHt1bml0OiAnZGF5JywgaW5wdXRMZW5ndGg6IDksIG51bWVyaWM6IGZhbHNlLCBtZXRob2Q6ICdkYXRlJ30sXG4gICAgICAgICAgICAnSCc6IHt1bml0OiAnaG91cicsIGNhcHRpb246ICdIb3VycycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAgICAgICAgICdISCc6IHt1bml0OiAnaG91cicsIGNhcHRpb246ICdIb3VycycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAgICAgICAgICdoJzoge3VuaXQ6ICdob3VyJywgY2FwdGlvbjogJ0hvdXJzJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICAgICAgICAgJ2hoJzoge3VuaXQ6ICdob3VyJywgY2FwdGlvbjogJ0hvdXJzJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICAgICAgICAgJ20nOiB7dW5pdDogJ21pbnV0ZScsIGNhcHRpb246ICdNaW51dGVzJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICAgICAgICAgJ21tJzoge3VuaXQ6ICdtaW51dGUnLCBjYXB0aW9uOiAnTWludXRlcycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAgICAgICAgICdzJzoge3VuaXQ6ICdzZWNvbmQnLCBjYXB0aW9uOiAnU2Vjb25kcycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAgICAgICAgICdzcyc6IHt1bml0OiAnc2Vjb25kJywgY2FwdGlvbjogJ1NlY29uZHMnLCBpbnB1dExlbmd0aDogMn1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgICAgICAgIGNhcHRpb246IG51bGwsXG4gICAgICAgICAgICBjYXB0aW9uRm9ybWF0OiBudWxsLFxuICAgICAgICAgICAgbnVtZXJpYzogdHJ1ZSxcbiAgICAgICAgICAgIG1vZGlmaWVyOiAwLFxuICAgICAgICAgICAgZWw6IG51bGwsXG4gICAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgICAgaW5wdXRMZW5ndGg6IG51bGwsXG4gICAgICAgICAgICBmb3JtYXQ6IGZvcm1hdFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGxvb2t1cCA9IHRhYmxlW2Zvcm1hdF0gfHwgbnVsbDtcblxuICAgICAgICBpZiAoIWxvb2t1cCkge1xuICAgICAgICAgICAgdGhyb3cgJ1N3ZWV0IERhdGUgUGlja2VyOiBVbnN1cHBvcnRlZCBmb3JtYXQgXCInICsgZm9ybWF0ICsgJ1wiJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFydCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBsb29rdXApO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcblxuICAgICAgICBpZiAoIXRoaXMucGFydC5tZXRob2QpIHRoaXMucGFydC5tZXRob2QgPSB0aGlzLnBhcnQudW5pdDtcblxuICAgIH1cblxuICAgIHNldFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICB9XG5cbiAgICBzZXRTdGVwcyhzdGVwcykge1xuICAgICAgICB0aGlzLnBhcnQuc3RlcCA9IHN0ZXBzO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IHRoaXMucGlja2VyLl9kYXRlTW9tZW50LmZvcm1hdCh0aGlzLnBhcnQuZm9ybWF0KSxcbiAgICAgICAgICAgIG51bWVyaWM6IHBhcnNlSW50KHRoaXMucGlja2VyLl9kYXRlTW9tZW50W3RoaXMucGFydC5tZXRob2RdKCkgKyB0aGlzLnBhcnQubW9kaWZpZXIpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG5cbiAgICAgICAgdmFsdWUgLT0gdGhpcy5wYXJ0Lm1vZGlmaWVyO1xuXG4gICAgICAgIGNvbnN0IG5ld0RhdGUgPSBtb21lbnQodGhpcy5waWNrZXIuX2RhdGVNb21lbnQpW3RoaXMucGFydC5tZXRob2RdKHZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5waWNrZXIuc2V0dGluZ3MubWF4RGF0ZSAmJiB0aGlzLnBpY2tlci5zZXR0aW5ncy5tYXhEYXRlIDwgbmV3RGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbWl0KCd1cGRhdGUnLCBuZXdEYXRlKTtcblxuICAgICAgICAvL3RoaXMucGlja2VyLl9kYXRlTW9tZW50ID0gbmV3RGF0ZTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgIH1cblxuICAgIGZvY3VzKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnZm9jdXMnLCB0aGlzLmVsZW1lbnRzLm1ldHJpYyk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubWV0cmljLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSByZW5kZXIoJ2Rpdi5zZHAtZGF0ZS1zZWdtZW50LWNvbCcpO1xuICAgICAgICBjb25zdCBzZWdtZW50ID0gcmVuZGVyKCdkaXYuc2RwLWRhdGUtc2VnbWVudCcpO1xuXG4gICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VnbWVudCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHtcbiAgICAgICAgICAgIHVwOiBzZWdtZW50LmFwcGVuZENoaWxkKHJlbmRlcignYnV0dG9uLnVwJykpLFxuICAgICAgICAgICAgbWV0cmljOiBzZWdtZW50LmFwcGVuZENoaWxkKHJlbmRlcignaW5wdXQubWV0cmljJykpLFxuICAgICAgICAgICAgY29tbWVudDogc2VnbWVudC5hcHBlbmRDaGlsZChyZW5kZXIoJ2Rpdi5jb21tZW50JykpLFxuICAgICAgICAgICAgZG93bjogc2VnbWVudC5hcHBlbmRDaGlsZChyZW5kZXIoJ2J1dHRvbi5kb3duJykpXG4gICAgICAgIH07XG5cbiAgICAgICAgbmV3IFB1c2hIb2xkRXZlbnQodGhpcy5lbGVtZW50cy51cCwgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUubnVtZXJpYyArIHRoaXMucGFydC5zdGVwO1xuICAgICAgICB9LCB0aGlzLnBpY2tlci5zZXR0aW5ncy5ob2xkSW50ZXJ2YWwsIHRoaXMucGlja2VyLnNldHRpbmdzLmRlYm91bmNlV2FpdCk7XG5cbiAgICAgICAgbmV3IFB1c2hIb2xkRXZlbnQodGhpcy5lbGVtZW50cy5kb3duLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5udW1lcmljIC0gdGhpcy5wYXJ0LnN0ZXA7XG4gICAgICAgIH0sIHRoaXMucGlja2VyLnNldHRpbmdzLmhvbGRJbnRlcnZhbCwgdGhpcy5waWNrZXIuc2V0dGluZ3MuZGVib3VuY2VXYWl0KTtcblxuICAgICAgICAvLyBUT0RPLCBwaWNrZXIgc2VuZCBwYXJ0IHNldHRpbmdzIG92ZXIgdG8gcGFydCBjbGFzcyByYXRoZXIgdGhhbiBtZSByZWZlcmVuY2luZyB0aGVtIHVwIHRoZSB0cmVlIGhlcmUuXG5cbiAgICAgICAgaWYgKHRoaXMucGlja2VyLnNldHRpbmdzLmFsbG93SW5wdXQgJiYgdGhpcy5wYXJ0Lm51bWVyaWMpIHtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMub25pbnB1dCA9IChlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUoZS50YXJnZXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgndmFsaWRhdGlvbi1mYWlsZWQnLCBlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2lucHV0JywgZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLm1ldHJpYy5vbmZvY3VzID0gKGUpID0+IHRoaXMuZW1pdCgnZm9jdXMnLCBlKTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMub25rZXlwcmVzcyA9IChlKSA9PiB0aGlzLmVtaXQoJ2tleXByZXNzJywgZSk7XG5cblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLm1ldHJpYy5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpc2UgdGhlIHZhbHVlc1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuXG4gICAgfVxuXG4gICAgLy8gVXBkYXRlcyB0aGUgc2VnbWVudCB3aXRoIHRoZSBhcHByb3ByaWF0ZSB2YWx1ZXNcbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMubWV0cmljLnZhbHVlID0gdGhpcy52YWx1ZS5kaXNwbGF5O1xuICAgICAgICBpZiAodGhpcy5wYXJ0LmNhcHRpb25Gb3JtYXQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuY29tbWVudC5pbm5lclRleHQgPSB0aGlzLnBpY2tlci5fZGF0ZU1vbWVudC5mb3JtYXQodGhpcy5wYXJ0LmNhcHRpb25Gb3JtYXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucGFydC5jYXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5wYXJ0LmNhcHRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuXG4gICAgICAgIC8vIE9ubHkgdmFsaWRhdGUgaWYgd2UgaGF2ZSBlbm91Z2ggaW5wdXQgdG8gZ28gb25cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHRoaXMucGFydC5pbnB1dExlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKSAtIHRoaXMucGFydC5tb2RpZmllcjtcblxuICAgICAgICBsZXQgdGVzdERhdGUgPSBtb21lbnQodGhpcy5waWNrZXIuX2RhdGVNb21lbnQpW3RoaXMucGFydC5tZXRob2RdKHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdGVzdERhdGVbdGhpcy5wYXJ0Lm1ldGhvZF0oKSA9PT0gdmFsdWU7XG5cbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICBsZXQgb3JpZ2luYWxJbnB1dCA9IHRoaXMudmFsdWUuZGlzcGxheTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgICAgICAvLyBPbmx5IHNldCB0aGUgdmFsdWUgb25jZSB0aGUgdXNlciBoYXMgZW50ZXJlZCB0aGUgd2hvbGUgdmFsdWVcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBtb21lbnQgbWF5IG5vdCBiZSBhYmxlIHRvIHBhcnNlIGZ1bGwgZGF0ZVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlLmxlbmd0aCA+PSB0aGlzLnBhcnQuaW5wdXRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICAgICAgZS50YXJnZXQuYmx1cigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiBlLnRhcmdldC5zZWxlY3QoKSk7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSkgPT4ge1xuICAgICAgICAgICAgbGV0IGNoYXJDb2RlID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgICAgICAgICBvcmlnaW5hbElucHV0ID0gZS50YXJnZXQudmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gIShjaGFyQ29kZSA+IDMxICYmIChjaGFyQ29kZSA8IDQ4IHx8IGNoYXJDb2RlID4gNTcpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcigndmFsaWRhdGlvbi1mYWlsZWQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS50YXJnZXQudmFsdWUgPSBvcmlnaW5hbElucHV0O1xuXG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyksIDEwMDApO1xuXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgLypcbiAgICAgRXZlbnRzXG4gICAgIFRoaXMgd291bGQgaWRlYWxseSBiZSBhIHRyYWl0LCBob3dldmVyIHRyYWl0cyBhcmUgbm90IGEgdGhpbmcgaW4gRVM2LlxuICAgICBSb2xsIG9uIEVTN1xuICAgICAqL1xuXG4gICAgYWRkTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5saXN0ZW5lcnMuc2V0KGxhYmVsLCBbXSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCkucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZW1pdChsYWJlbCwgLi4uYXJncykge1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCB7IHN1cHBvcnRzVG91Y2ggfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQdXNoSG9sZEV2ZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHRhcmdldCwgY2FsbGJhY2ssIGhvbGRJbnRlcnZhbCwgZGVib3VuY2VXYWl0KSB7XG5cbiAgICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBob2xkSW50ZXJ2YWw7XG5cbiAgICAgICAgdGhpcy5kZWJvdW5jZSA9IGRlYm91bmNlV2FpdDtcblxuICAgICAgICB0aGlzLl9leGVjdXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2ludGVydmFsVGltZXIgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcblxuICAgICAgICBjb25zdCBzdGFydEV2ZW50cyA9IHN1cHBvcnRzVG91Y2goKSA/IFsnb250b3VjaHN0YXJ0JywgJ29ubW91c2Vkb3duJ10gOiBbJ29ubW91c2Vkb3duJ107XG4gICAgICAgIHRoaXMuX2JpbmRFdmVudCh0aGlzLnRhcmdldCwgc3RhcnRFdmVudHMsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZURvd24oZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZW5kRXZlbnRzID0gc3VwcG9ydHNUb3VjaCgpID8gWydvbnRvdWNoZW5kJywgJ29ubW91c2V1cCddIDogWydvbm1vdXNldXAnXTtcbiAgICAgICAgdGhpcy5fYmluZEV2ZW50KHRoaXMudGFyZ2V0LCBlbmRFdmVudHMsIChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9tb3VzZVVwKGUpXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgX21vdXNlRG93bihlKSB7XG4gICAgICAgIC8vIE9ubHkgZmlyZSAxIGV2ZW50XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICB0aGlzLl9leGVjdXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICAgICAgfSwgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgfSwgdGhpcy5kZWJvdW5jZSk7XG4gICAgfVxuXG4gICAgX21vdXNlVXAoZSkge1xuXG4gICAgICAgIC8vIE9ubHkgZmlyZSAxIGV2ZW50XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLl9jbGVhcigpO1xuXG4gICAgICAgIGlmICghdGhpcy5fZXhlY3V0ZWQpIHtcbiAgICAgICAgICAgIC8vIFNpbXVsYXRlIGNsaWNrIGFzIHdlIHN0ZWFsIHRoZSBldmVudFxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBfY2xlYXIoKSB7XG4gICAgICAgIGlmICh0aGlzLl90aW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuX3RpbWVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faW50ZXJ2YWxUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX2ludGVydmFsVGltZXIpO1xuICAgICAgICAgICAgdGhpcy5faW50ZXJ2YWxUaW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfYmluZEV2ZW50KGVsZW1lbnQsIGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICAgICAgZm9yIChsZXQgZXZlbnQgb2YgZXZlbnRzKSB7XG4gICAgICAgICAgICBlbGVtZW50W2V2ZW50XSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0iLCJsZXQgcmVuZGVyID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHNlbGVjdG9yLnNwbGl0KCcuJyk7XG4gICAgY29uc3QgZWxlbWVudE5hbWUgPSBhdHRyaWJ1dGVzLnNoaWZ0KCk7XG4gICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudE5hbWUpO1xuXG4gICAgZm9yIChsZXQgY2xhc3NOYW1lIG9mIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCByZW5kZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgZGVmYXVsdHMgZnJvbSAnLi9tb2R1bGVzL2RlZmF1bHRzJztcbmltcG9ydCByZW5kZXIgZnJvbSAnLi9tb2R1bGVzL3JlbmRlcic7XG5pbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi9tb2R1bGVzL2JhY2tkcm9wJztcbmltcG9ydCBQYXJ0IGZyb20gJy4vbW9kdWxlcy9wYXJ0JztcblxuaW1wb3J0IHsgaXNUb3VjaCB9IGZyb20gJy4vbW9kdWxlcy9oZWxwZXJzJztcblxubGV0IHN3ZWV0RGF0ZVBpY2tlcnMgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dlZXREYXRlUGlja2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBjb25maWcpIHtcblxuICAgICAgICBzd2VldERhdGVQaWNrZXJzLnB1c2godGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGNvbmZpZywgZGVmYXVsdHMpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIFN0b3AgcGVvcGxlIG9uIHRvdWNoIGRldmljZXMgYWNjaWRlbnRhbGx5IGNsaWNraW5nIGEgbnVtYmVyXG4gICAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGFycm93XG4gICAgICAgIGlmIChpc1RvdWNoKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYWxsb3dJbnB1dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLmFjdGl2ZVBhcnQgPSAtMTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVEYXRlKCk7XG5cbiAgICAgICAgdGhpcy5jb25zdHJhaW5NYXgoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVGb3JtKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaW5wdXQub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgcmF3IHZhbHVlIGZyb20gdGhlIGlucHV0XG4gICAgZ2V0VmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXNzaWduKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIG1vbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZU1vbWVudCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZU1vbWVudCA9IG1vbWVudCh2YWx1ZSwgdGhpcy5zZXR0aW5ncy5zdWJtaXRGb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZURhdGUoKSB7XG4gICAgICAgIGNvbnN0IHJhd1ZhbHVlID0gdGhpcy5nZXRWYWx1ZSgpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHJhd1ZhbHVlLCB0aGlzLnNldHRpbmdzLmRlZmF1bHREYXRlLCB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcblxuICAgICAgICB0aGlzLmFzc2lnbihyYXdWYWx1ZSB8fCB0aGlzLnNldHRpbmdzLmRlZmF1bHREYXRlIHx8IHRoaXMuaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpO1xuXG4gICAgICAgIGlmICghdGhpcy5fZGF0ZU1vbWVudCB8fCAhdGhpcy5fZGF0ZU1vbWVudC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuYXNzaWduKHRoaXMuc2V0dGluZ3MuZGVmYXVsdERhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RyYWluTWF4KCkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXhEYXRlICYmIHRoaXMuc2V0dGluZ3MubWF4RGF0ZSA8IHRoaXMuX2RhdGVNb21lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVNb21lbnQgPSB0aGlzLnNldHRpbmdzLm1heERhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplTW9kYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhY2tkcm9wLnNob3coKTtcbiAgICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG5cbiAgICB9XG5cbiAgICBpbml0aWFsaXplTW9kYWwoKSB7XG5cbiAgICAgICAgdGhpcy5idWlsZE1vZGFsKCk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBwYXJ0c1xuICAgICAgICBjb25zdCBmb3JtYXRQYXJ0cyA9IHRoaXMuc2V0dGluZ3MuZm9ybWF0LnNwbGl0KCcgJyk7XG5cbiAgICAgICAgZm9yIChsZXQgZm9ybWF0IG9mIGZvcm1hdFBhcnRzKSB7XG5cbiAgICAgICAgICAgIGxldCBwYXJ0ID0gbmV3IFBhcnQodGhpcywgZm9ybWF0KTtcblxuICAgICAgICAgICAgdGhpcy5wYXJ0cy5wdXNoKHBhcnQpO1xuXG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBhcnRzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIHBhcnQuc2V0UG9zaXRpb24oaW5kZXgpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdGVwc1tmb3JtYXRdKSB7XG4gICAgICAgICAgICAgICAgcGFydC5zZXRTdGVwcyh0aGlzLnNldHRpbmdzLnN0ZXBzW2Zvcm1hdF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXJ0LmFkZExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3MudGFiRmlsbCAmJiBlLnRhcmdldC52YWx1ZS5sZW5ndGggPT0gcGFydC5wYXJ0LmlucHV0TGVuZ3RoICYmIGluZGV4IDwgZm9ybWF0UGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dFBhcnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGFydC5hZGRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB0aGlzLmFjdGl2ZVBhcnQgPSBpbmRleCk7XG5cbiAgICAgICAgICAgIHBhcnQuYWRkTGlzdGVuZXIoJ3VwZGF0ZScsIChkYXRlKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0ZU1vbWVudCA9IGRhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGFsbCB0aGUgcGFydHMgdG8gdXBkYXRlIHRoZWlyIFVJXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgcGFydCBvZiB0aGlzLnBhcnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVE9ETyAtIGRvbid0IGxpa2UgbmVlZCByZWYgdG8gY29udGFpbmVyXG4gICAgICAgICAgICB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5zZHAtY29udGFpbmVyJykuYXBwZW5kQ2hpbGQocGFydC5yZW5kZXIoKSlcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIGluaXRpYWxpemVGb3JtKCkge1xuICAgICAgICB0aGlzLnN1Ym1pdElucHV0ID0gcmVuZGVyKCdpbnB1dCcpO1xuICAgICAgICB0aGlzLnN1Ym1pdElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5zdWJtaXRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpKTtcbiAgICAgICAgdGhpcy5pbnB1dC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuc3VibWl0SW5wdXQpO1xuICAgICAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIH1cblxuICAgIG5leHRQYXJ0KCkge1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuYWN0aXZlUGFydCArIDE7XG5cbiAgICAgICAgaWYgKG5leHQgPj0gdGhpcy5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFydHNbbmV4dF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBidWlsZE1vZGFsKCkge1xuXG4gICAgICAgIHRoaXMubW9kYWwgPSByZW5kZXIoJ2Rpdi5zZHAtbW9kYWwuaGlkZScpO1xuICAgICAgICBpZiAoaXNUb3VjaCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ3RvdWNoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xvc2VCdG4gPSByZW5kZXIoJ2J1dHRvbi5jbG9zZScpO1xuICAgICAgICBjbG9zZUJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5jb25zdHJ1Y3Rvci5oaWRlKCk7XG4gICAgICAgIHRoaXMubW9kYWwuYXBwZW5kQ2hpbGQoY2xvc2VCdG4pO1xuXG4gICAgICAgIGxldCBjb250YWluZXIgPSByZW5kZXIoJ2Rpdi5zZHAtY29udGFpbmVyJyk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgICAgIC8vIEFjdGlvbnNcbiAgICAgICAgbGV0IGFjdGlvbkNvbnRhaW5lciA9IHJlbmRlcignZGl2LnNkcC1hY3Rpb25zJyk7XG4gICAgICAgIGxldCBjbGVhckJ0bldyYXBwZXIgPSByZW5kZXIoJ2Rpdi5zZHAtYnRuLXdyYXBwZXInKTtcbiAgICAgICAgbGV0IGNsZWFyQnRuID0gcmVuZGVyKCdidXR0b24uc2RwLWNsZWFyJyk7XG4gICAgICAgIGxldCBzZXRCdG5XcmFwcGVyID0gcmVuZGVyKCdkaXYuc2RwLWJ0bi13cmFwcGVyJyk7XG4gICAgICAgIGxldCBzZXRCdG4gPSByZW5kZXIoJ2J1dHRvbi5zZHAtc2V0Jyk7XG5cbiAgICAgICAgY2xlYXJCdG5XcmFwcGVyLmFwcGVuZENoaWxkKGNsZWFyQnRuKTtcbiAgICAgICAgc2V0QnRuV3JhcHBlci5hcHBlbmRDaGlsZChzZXRCdG4pO1xuXG4gICAgICAgIGNsZWFyQnRuLmlubmVyVGV4dCA9ICdDbGVhcic7XG5cbiAgICAgICAgc2V0QnRuLmlubmVyVGV4dCA9ICdTZXQnO1xuXG4gICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnNob3dDbGVhcikge1xuICAgICAgICAgICAgYWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsZWFyQnRuV3JhcHBlcik7XG4gICAgICAgICAgICBjbGVhckJ0bi5vbmNsaWNrID0gKCkgPT4gdGhpcy5jbGVhcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKHNldEJ0bldyYXBwZXIpO1xuXG4gICAgICAgIHNldEJ0bi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGb3JtKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmhpZGUoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKGFjdGlvbkNvbnRhaW5lcik7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuXG4gICAgfVxuXG4gICAgdXBkYXRlRm9ybSgpIHtcbiAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9IHRoaXMuX2RhdGVNb21lbnQuZm9ybWF0KHRoaXMuc2V0dGluZ3MuZGlzcGxheUZvcm1hdCk7XG4gICAgICAgIHRoaXMuc3VibWl0SW5wdXQudmFsdWUgPSB0aGlzLl9kYXRlTW9tZW50LmZvcm1hdCh0aGlzLnNldHRpbmdzLnN1Ym1pdEZvcm1hdCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgdGhpcy5zdWJtaXRJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmhpZGUoKTtcbiAgICAgICAgLy9UT0RPIC0gSW1wbGVtZW50IGNsZWFyIGV2ZW50XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIGZvciAobGV0IHBpY2tlciBvZiBzd2VldERhdGVQaWNrZXJzKSB7XG4gICAgICAgICAgICBwaWNrZXIubW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgQmFja2Ryb3AuaGlkZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgIEV2ZW50c1xuICAgICBUaGlzIHdvdWxkIGlkZWFsbHkgYmUgYSB0cmFpdCwgaG93ZXZlciB0cmFpdHMgYXJlIG5vdCBhIHRoaW5nIGluIEVTNi5cbiAgICAgUm9sbCBvbiBFUzdcbiAgICAgKi9cblxuICAgIGFkZExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5oYXMobGFiZWwpIHx8IHRoaXMubGlzdGVuZXJzLnNldChsYWJlbCwgW10pO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5nZXQobGFiZWwpLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGVtaXQobGFiZWwsIC4uLmFyZ3MpIHtcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCk7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufVxuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbndpbmRvdy5Td2VldERhdGVQaWNrZXIgPSB3aW5kb3cuc2RwID0gU3dlZXREYXRlUGlja2VyO1xufSBlbHNlIHtcbmFsZXJ0KCdTd2VldCBEYXRlIFBpY2tlciBpcyBhIGZyb250ZW5kIG1vZHVsZSBhbmQgcmVxdWlyZXMgdGhlIHdpbmRvdyB2YXIuJylcbn0iXX0=


    // Require JS
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return SweetDatePicker;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = SweetDatePicker;
    }

})(window, document);