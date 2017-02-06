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
    debounceWait: 400,
    holdInterval: 100,
    defaultDate: moment()
};

exports.default = defaults;
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var formats = {
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

var lookupFormat = function lookupFormat(format) {
    var lookup = formats[format] || null;

    if (!lookup) {
        return false;
    }

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

    var part = Object.assign({}, defaults, lookup);

    if (!part.method) {
        part.method = part.unit;
    }

    return part;
};

exports.default = lookupFormat;
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render = require('./render');

var _render2 = _interopRequireDefault(_render);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
    function Modal(settings) {
        var _this = this;

        _classCallCheck(this, Modal);

        this.settings = settings;

        this.listeners = new Map();

        this.modal = (0, _render2.default)('div.sdp-modal.hide');

        if ((0, _helpers.isTouch)()) {
            this.modal.classList.add('touch');
        }

        var closeBtn = (0, _render2.default)('button.close');
        closeBtn.onclick = function () {
            return SweetDatePicker.hide();
        };

        this.modal.appendChild(closeBtn);

        this.container = (0, _render2.default)('div.sdp-container');

        this.modal.appendChild(this.container);

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
                return _this.emit('clear');
            };
        }

        actionContainer.appendChild(setBtnWrapper);

        setBtn.onclick = function () {
            return _this.emit('set');
        };

        this.modal.appendChild(actionContainer);
    }

    _createClass(Modal, [{
        key: 'render',
        value: function render() {
            document.querySelector('body').appendChild(this.modal);
        }
    }, {
        key: 'addPart',
        value: function addPart(part) {
            this.container.appendChild(part.render());
        }
    }, {
        key: 'show',
        value: function show() {
            this.modal.classList.remove('hide');
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.modal.classList.add('hide');
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
    }]);

    return Modal;
}();

exports.default = Modal;
module.exports = exports['default'];

},{"./helpers":4,"./render":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _render2 = require('./render');

var _render3 = _interopRequireDefault(_render2);

var _pushHoldEvent = require('./push-hold-event');

var _pushHoldEvent2 = _interopRequireDefault(_pushHoldEvent);

var _formats = require('./formats');

var _formats2 = _interopRequireDefault(_formats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Part = function () {
    function Part(picker, format) {
        _classCallCheck(this, Part);

        this.picker = picker;

        this.listeners = new Map();

        this.rendered = false;

        this.elements = {};

        this.part = (0, _formats2.default)(format);

        if (!this.part) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }
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
            this.elements.metric.focus();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            this.rendered = true;

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

            if (this.picker.settings.allowInput && this.part.numeric) {

                this.elements.metric.oninput = function (e) {

                    if (!_this.validate(e.target.value)) {
                        _this.emit('validation-failed', e);
                    }

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
            if (this.rendered) {
                this.elements.metric.value = this.value.display;
                if (this.part.captionFormat) {
                    this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
                } else if (this.part.caption) {
                    this.elements.comment.innerText = this.part.caption;
                }
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
        key: 'recalculate',
        value: function recalculate() {
            console.log(this.value);
            this.value = this.value.numeric;
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

            // Round value to closest step
            value = Math.round(value / this.part.step) * this.part.step;

            var newDate = moment(this.picker._dateMoment)[this.part.method](value);

            if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
                return;
            }

            this.emit('update', newDate);

            this.update();
        }
    }]);

    return Part;
}();

exports.default = Part;
module.exports = exports['default'];

},{"./formats":3,"./push-hold-event":7,"./render":8}],7:[function(require,module,exports){
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

},{"./helpers":4}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

var _modal = require('./modules/modal');

var _modal2 = _interopRequireDefault(_modal);

var _helpers = require('./modules/helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sweetDatePickers = [];

var SweetDatePicker = function () {
    function SweetDatePicker(input, config) {
        var _this = this;

        _classCallCheck(this, SweetDatePicker);

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, _defaults2.default, config);

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

            this.assign(rawValue || this.settings.defaultDate || this.input.getAttribute('data-value'));

            if (!this._dateMoment || !this._dateMoment.isValid()) {
                this.assign(this.settings.defaultDate);
            }

            // We need the parts so we can round the date to the appropriate amount of steps
            this.createParts();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.parts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var part = _step.value;

                    part.recalculate();
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
            this.modal.show();
        }
    }, {
        key: 'initializeModal',
        value: function initializeModal() {
            var _this2 = this;

            this.modal = new _modal2.default({ showClear: this.settings.showClear });

            this.modal.addListener('clear', function () {
                return _this2.clear();
            });
            this.modal.addListener('set', function () {
                return _this2.set();
            });

            this.modal.render();

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var part = _step2.value;

                    this.modal.addPart(part);
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
        }
    }, {
        key: 'createParts',
        value: function createParts() {
            var _this3 = this;

            var formatParts = this.settings.format.split(' ');

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                var _loop = function _loop() {
                    var format = _step3.value;


                    var part = new _part3.default(_this3, format);

                    _this3.parts.push(part);

                    var index = _this3.parts.length - 1;

                    part.setPosition(index);

                    if (_this3.settings.steps[format]) {
                        part.setSteps(_this3.settings.steps[format]);
                    }

                    part.addListener('input', function (e) {
                        if (_this3.settings.tabFill && e.target.value.length == part.part.inputLength && index < formatParts.length) {
                            _this3.nextPart();
                        }
                    });

                    part.addListener('focus', function () {
                        return _this3.activePart = index;
                    });

                    part.addListener('update', function (date) {
                        _this3._dateMoment = date;

                        // Trigger all the parts to update their UI
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;

                        try {
                            for (var _iterator4 = _this3.parts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var _part = _step4.value;

                                _part.update();
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
                    });
                };

                for (var _iterator3 = formatParts[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    _loop();
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
        key: 'set',
        value: function set() {
            this.updateForm();
            this.constructor.hide();
            this.emit('set', this);
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
            this.emit('clear', this);
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
            console.log(sweetDatePickers);
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = sweetDatePickers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var picker = _step5.value;

                    if (picker.modal) {
                        picker.modal.hide();
                    }
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

            _backdrop2.default.hide();
        }
    }]);

    return SweetDatePicker;
}();

exports.default = SweetDatePicker;


if (typeof window !== 'undefined') {
    window.SweetDatePicker = SweetDatePicker;

    window.sdp = function (input, config) {
        return new SweetDatePicker(input, config);
    };
} else {
    alert('Sweet Date Picker is a frontend module and requires the window var.');
}
module.exports = exports['default'];

},{"./modules/backdrop":1,"./modules/defaults":2,"./modules/helpers":4,"./modules/modal":5,"./modules/part":6,"./modules/render":8}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbW9kdWxlcy9iYWNrZHJvcC5qcyIsInNyYy9tb2R1bGVzL2RlZmF1bHRzLmpzIiwic3JjL21vZHVsZXMvZm9ybWF0cy5qcyIsInNyYy9tb2R1bGVzL2hlbHBlcnMuanMiLCJzcmMvbW9kdWxlcy9tb2RhbC5qcyIsInNyYy9tb2R1bGVzL3BhcnQuanMiLCJzcmMvbW9kdWxlcy9wdXNoLWhvbGQtZXZlbnQuanMiLCJzcmMvbW9kdWxlcy9yZW5kZXIuanMiLCJzcmMvc3dlZXQtZGF0ZS1waWNrZXIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztJQ0FxQixROzs7Ozs7O3FDQUVHO0FBQ2hCLG1CQUFPLFNBQVMsc0JBQVQsQ0FBZ0MsY0FBaEMsRUFBZ0QsQ0FBaEQsS0FBc0QsSUFBN0Q7QUFDSDs7OytCQUVhO0FBQ1YsZ0JBQUksQ0FBQyxLQUFLLFVBQUwsRUFBTCxFQUF3QjtBQUNwQixxQkFBSyxNQUFMO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUssVUFBTCxHQUFrQixTQUFsQixDQUE0QixNQUE1QixDQUFtQyxNQUFuQztBQUNIO0FBQ0o7OzsrQkFFYTtBQUNWLGlCQUFLLFVBQUwsR0FBa0IsU0FBbEIsQ0FBNEIsR0FBNUIsQ0FBZ0MsTUFBaEM7QUFDSDs7O2lDQUVlO0FBQ1osZ0JBQU0sVUFBVSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBaEI7QUFDQSxvQkFBUSxTQUFSLEdBQW9CLGNBQXBCO0FBQ0Esb0JBQVEsT0FBUixHQUFrQjtBQUFBLHVCQUFNLGdCQUFnQixJQUFoQixFQUFOO0FBQUEsYUFBbEI7QUFDQSxxQkFBUyxhQUFULENBQXVCLE1BQXZCLEVBQStCLFdBQS9CLENBQTJDLE9BQTNDO0FBQ0g7Ozs7OztrQkF2QmdCLFE7Ozs7Ozs7OztBQ0FyQixJQUFJLFdBQVc7QUFDWCxZQUFRLFVBREc7QUFFWCxtQkFBZSxvQkFGSjtBQUdY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dGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2Ryb3Age1xuXG4gICAgc3RhdGljIGdldEVsZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZHAtYmFja2Ryb3AnKVswXSB8fCBudWxsO1xuICAgIH1cblxuICAgIHN0YXRpYyBzaG93KCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0RWxlbWVudCgpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nZXRFbGVtZW50KCkuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbWVudCgpLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcmVuZGVyKCkge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gJ3NkcC1iYWNrZHJvcCc7XG4gICAgICAgIGVsZW1lbnQub25jbGljayA9ICgpID0+IFN3ZWV0RGF0ZVBpY2tlci5oaWRlKCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbn0iLCJsZXQgZGVmYXVsdHMgPSB7XG4gICAgZm9ybWF0OiAnRCBNIFlZWVknLFxuICAgIGRpc3BsYXlGb3JtYXQ6ICdkZGRkLCBNTU1NIERvIFlZWVknLFxuICAgIHN1Ym1pdEZvcm1hdDogJ1lZWVktTU0tREQnLFxuICAgIGFsbG93SW5wdXQ6IHRydWUsXG4gICAgdGFiRmlsbDogdHJ1ZSxcbiAgICBzaG93Q2xlYXI6IHRydWUsXG4gICAgc3RlcHM6IHt9LFxuICAgIGRlYm91bmNlV2FpdDogNDAwLFxuICAgIGhvbGRJbnRlcnZhbDogMTAwLFxuICAgIGRlZmF1bHREYXRlOiBtb21lbnQoKVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdHM7IiwibGV0IGZvcm1hdHMgPSB7XG4gICAgJ1lZWVknOiB7dW5pdDogJ3llYXInLCBpbnB1dExlbmd0aDogNH0sXG4gICAgJ1lZJzoge3VuaXQ6ICd5ZWFyJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICdNJzoge3VuaXQ6ICdtb250aCcsIGNhcHRpb25Gb3JtYXQ6ICdNTU1NJywgaW5wdXRMZW5ndGg6IDIsIG1vZGlmaWVyOiAxfSxcbiAgICAnTU0nOiB7dW5pdDogJ21vbnRoJywgY2FwdGlvbkZvcm1hdDogJ01NTU0nLCBpbnB1dExlbmd0aDogMiwgbW9kaWZpZXI6IDF9LFxuICAgICdNTU0nOiB7dW5pdDogJ21vbnRoJywgaW5wdXRMZW5ndGg6IDMsIG51bWVyaWM6IGZhbHNlLCBtb2RpZmllcjogMX0sXG4gICAgJ01NTU0nOiB7dW5pdDogJ21vbnRoJywgaW5wdXRMZW5ndGg6IDgsIG51bWVyaWM6IGZhbHNlLCBtb2RpZmllcjogMX0sXG4gICAgJ0QnOiB7dW5pdDogJ2RheScsIGNhcHRpb25Gb3JtYXQ6ICdkZGRkJywgaW5wdXRMZW5ndGg6IDIsIG1ldGhvZDogJ2RhdGUnfSxcbiAgICAnREQnOiB7dW5pdDogJ2RheScsIGNhcHRpb25Gb3JtYXQ6ICdkZGRkJywgaW5wdXRMZW5ndGg6IDIsIG1ldGhvZDogJ2RhdGUnfSxcbiAgICAnREREJzoge3VuaXQ6ICdkYXknLCBpbnB1dExlbmd0aDogMywgbnVtZXJpYzogZmFsc2UsIG1ldGhvZDogJ2RhdGUnfSxcbiAgICAnRERERCc6IHt1bml0OiAnZGF5JywgaW5wdXRMZW5ndGg6IDksIG51bWVyaWM6IGZhbHNlLCBtZXRob2Q6ICdkYXRlJ30sXG4gICAgJ0gnOiB7dW5pdDogJ2hvdXInLCBjYXB0aW9uOiAnSG91cnMnLCBpbnB1dExlbmd0aDogMn0sXG4gICAgJ0hIJzoge3VuaXQ6ICdob3VyJywgY2FwdGlvbjogJ0hvdXJzJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICdoJzoge3VuaXQ6ICdob3VyJywgY2FwdGlvbjogJ0hvdXJzJywgaW5wdXRMZW5ndGg6IDJ9LFxuICAgICdoaCc6IHt1bml0OiAnaG91cicsIGNhcHRpb246ICdIb3VycycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAnbSc6IHt1bml0OiAnbWludXRlJywgY2FwdGlvbjogJ01pbnV0ZXMnLCBpbnB1dExlbmd0aDogMn0sXG4gICAgJ21tJzoge3VuaXQ6ICdtaW51dGUnLCBjYXB0aW9uOiAnTWludXRlcycsIGlucHV0TGVuZ3RoOiAyfSxcbiAgICAncyc6IHt1bml0OiAnc2Vjb25kJywgY2FwdGlvbjogJ1NlY29uZHMnLCBpbnB1dExlbmd0aDogMn0sXG4gICAgJ3NzJzoge3VuaXQ6ICdzZWNvbmQnLCBjYXB0aW9uOiAnU2Vjb25kcycsIGlucHV0TGVuZ3RoOiAyfVxufTtcblxuY29uc3QgbG9va3VwRm9ybWF0ID0gKGZvcm1hdCkgPT4ge1xuICAgIGNvbnN0IGxvb2t1cCA9IGZvcm1hdHNbZm9ybWF0XSB8fCBudWxsO1xuXG4gICAgaWYgKCFsb29rdXApIHsgcmV0dXJuIGZhbHNlIH1cblxuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgICBjYXB0aW9uOiBudWxsLFxuICAgICAgICBjYXB0aW9uRm9ybWF0OiBudWxsLFxuICAgICAgICBudW1lcmljOiB0cnVlLFxuICAgICAgICBtb2RpZmllcjogMCxcbiAgICAgICAgZWw6IG51bGwsXG4gICAgICAgIHN0ZXA6IDEsXG4gICAgICAgIGlucHV0TGVuZ3RoOiBudWxsLFxuICAgICAgICBmb3JtYXQ6IGZvcm1hdFxuICAgIH07XG5cbiAgICBsZXQgcGFydCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBsb29rdXApO1xuXG4gICAgaWYgKCEgcGFydC5tZXRob2QpIHsgcGFydC5tZXRob2QgPSBwYXJ0LnVuaXQ7IH1cblxuICAgIHJldHVybiBwYXJ0O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbG9va3VwRm9ybWF0OyIsImxldCBpc1RvdWNoID0gKCkgID0+IHtcbiAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKTtcbn07XG5cbmxldCBzdXBwb3J0c1RvdWNoID0gKCkgPT4ge1xuICAgIHJldHVybiAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3c7XG59O1xuXG5leHBvcnQge1xuICAgIGlzVG91Y2gsXG4gICAgc3VwcG9ydHNUb3VjaFxufTsiLCJpbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCB7IGlzVG91Y2ggfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RhbCB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xuXG4gICAgICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcblxuICAgICAgICB0aGlzLmxpc3RlbmVycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICB0aGlzLm1vZGFsID0gcmVuZGVyKCdkaXYuc2RwLW1vZGFsLmhpZGUnKTtcblxuICAgICAgICBpZiAoaXNUb3VjaCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ3RvdWNoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgY2xvc2VCdG4gPSByZW5kZXIoJ2J1dHRvbi5jbG9zZScpO1xuICAgICAgICBjbG9zZUJ0bi5vbmNsaWNrID0gKCkgPT4gU3dlZXREYXRlUGlja2VyLmhpZGUoKTtcblxuICAgICAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKGNsb3NlQnRuKTtcblxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IHJlbmRlcignZGl2LnNkcC1jb250YWluZXInKTtcblxuICAgICAgICB0aGlzLm1vZGFsLmFwcGVuZENoaWxkKHRoaXMuY29udGFpbmVyKTtcblxuICAgICAgICAvLyBBY3Rpb25zXG4gICAgICAgIGxldCBhY3Rpb25Db250YWluZXIgPSByZW5kZXIoJ2Rpdi5zZHAtYWN0aW9ucycpO1xuICAgICAgICBsZXQgY2xlYXJCdG5XcmFwcGVyID0gcmVuZGVyKCdkaXYuc2RwLWJ0bi13cmFwcGVyJyk7XG4gICAgICAgIGxldCBjbGVhckJ0biA9IHJlbmRlcignYnV0dG9uLnNkcC1jbGVhcicpO1xuICAgICAgICBsZXQgc2V0QnRuV3JhcHBlciA9IHJlbmRlcignZGl2LnNkcC1idG4td3JhcHBlcicpO1xuICAgICAgICBsZXQgc2V0QnRuID0gcmVuZGVyKCdidXR0b24uc2RwLXNldCcpO1xuXG4gICAgICAgIGNsZWFyQnRuV3JhcHBlci5hcHBlbmRDaGlsZChjbGVhckJ0bik7XG4gICAgICAgIHNldEJ0bldyYXBwZXIuYXBwZW5kQ2hpbGQoc2V0QnRuKTtcblxuICAgICAgICBjbGVhckJ0bi5pbm5lclRleHQgPSAnQ2xlYXInO1xuXG4gICAgICAgIHNldEJ0bi5pbm5lclRleHQgPSAnU2V0JztcblxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zaG93Q2xlYXIpIHtcbiAgICAgICAgICAgIGFjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjbGVhckJ0bldyYXBwZXIpO1xuICAgICAgICAgICAgY2xlYXJCdG4ub25jbGljayA9ICgpID0+IHRoaXMuZW1pdCgnY2xlYXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChzZXRCdG5XcmFwcGVyKTtcblxuICAgICAgICBzZXRCdG4ub25jbGljayA9ICgpID0+IHRoaXMuZW1pdCgnc2V0Jyk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5hcHBlbmRDaGlsZChhY3Rpb25Db250YWluZXIpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRoaXMubW9kYWwpO1xuICAgIH1cblxuICAgIGFkZFBhcnQocGFydCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChwYXJ0LnJlbmRlcigpKTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICBFdmVudHNcbiAgICAgVGhpcyB3b3VsZCBpZGVhbGx5IGJlIGEgdHJhaXQsIGhvd2V2ZXIgdHJhaXRzIGFyZSBub3QgYSB0aGluZyBpbiBFUzYuXG4gICAgIFJvbGwgb24gRVM3XG4gICAgICovXG5cbiAgICBhZGRMaXN0ZW5lcihsYWJlbCwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuaGFzKGxhYmVsKSB8fCB0aGlzLmxpc3RlbmVycy5zZXQobGFiZWwsIFtdKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9XG5cbiAgICBlbWl0KGxhYmVsLCAuLi5hcmdzKSB7XG4gICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5nZXQobGFiZWwpO1xuXG4gICAgICAgIGlmIChsaXN0ZW5lcnMgJiYgbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbn0iLCJpbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBQdXNoSG9sZEV2ZW50IGZyb20gJy4vcHVzaC1ob2xkLWV2ZW50JztcbmltcG9ydCBmb3JtYXRMb29rdXAgZnJvbSAnLi9mb3JtYXRzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydCB7XG5cbiAgICBjb25zdHJ1Y3RvcihwaWNrZXIsIGZvcm1hdCkge1xuXG4gICAgICAgIHRoaXMucGlja2VyID0gcGlja2VyO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG5cbiAgICAgICAgdGhpcy5wYXJ0ID0gZm9ybWF0TG9va3VwKGZvcm1hdCk7XG5cbiAgICAgICAgaWYgKCEgdGhpcy5wYXJ0KSB7XG4gICAgICAgICAgICB0aHJvdyAnU3dlZXQgRGF0ZSBQaWNrZXI6IFVuc3VwcG9ydGVkIGZvcm1hdCBcIicgKyBmb3JtYXQgKyAnXCInO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBzZXRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgfVxuXG4gICAgc2V0U3RlcHMoc3RlcHMpIHtcbiAgICAgICAgdGhpcy5wYXJ0LnN0ZXAgPSBzdGVwcztcbiAgICB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0aGlzLnBpY2tlci5fZGF0ZU1vbWVudC5mb3JtYXQodGhpcy5wYXJ0LmZvcm1hdCksXG4gICAgICAgICAgICBudW1lcmljOiBwYXJzZUludCh0aGlzLnBpY2tlci5fZGF0ZU1vbWVudFt0aGlzLnBhcnQubWV0aG9kXSgpICsgdGhpcy5wYXJ0Lm1vZGlmaWVyKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuXG4gICAgICAgIHZhbHVlIC09IHRoaXMucGFydC5tb2RpZmllcjtcblxuICAgICAgICAvLyBSb3VuZCB2YWx1ZSB0byBjbG9zZXN0IHN0ZXBcbiAgICAgICAgdmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlIC8gdGhpcy5wYXJ0LnN0ZXApICogdGhpcy5wYXJ0LnN0ZXA7XG5cbiAgICAgICAgY29uc3QgbmV3RGF0ZSA9IG1vbWVudCh0aGlzLnBpY2tlci5fZGF0ZU1vbWVudClbdGhpcy5wYXJ0Lm1ldGhvZF0odmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5zZXR0aW5ncy5tYXhEYXRlICYmIHRoaXMucGlja2VyLnNldHRpbmdzLm1heERhdGUgPCBuZXdEYXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ3VwZGF0ZScsIG5ld0RhdGUpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICB9XG5cbiAgICBmb2N1cygpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMuZm9jdXMoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlZCA9IHRydWU7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudCA9IHJlbmRlcignZGl2LnNkcC1kYXRlLXNlZ21lbnQtY29sJyk7XG4gICAgICAgIGNvbnN0IHNlZ21lbnQgPSByZW5kZXIoJ2Rpdi5zZHAtZGF0ZS1zZWdtZW50Jyk7XG5cbiAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChzZWdtZW50KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge1xuICAgICAgICAgICAgdXA6IHNlZ21lbnQuYXBwZW5kQ2hpbGQocmVuZGVyKCdidXR0b24udXAnKSksXG4gICAgICAgICAgICBtZXRyaWM6IHNlZ21lbnQuYXBwZW5kQ2hpbGQocmVuZGVyKCdpbnB1dC5tZXRyaWMnKSksXG4gICAgICAgICAgICBjb21tZW50OiBzZWdtZW50LmFwcGVuZENoaWxkKHJlbmRlcignZGl2LmNvbW1lbnQnKSksXG4gICAgICAgICAgICBkb3duOiBzZWdtZW50LmFwcGVuZENoaWxkKHJlbmRlcignYnV0dG9uLmRvd24nKSlcbiAgICAgICAgfTtcblxuICAgICAgICBuZXcgUHVzaEhvbGRFdmVudCh0aGlzLmVsZW1lbnRzLnVwLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZS5udW1lcmljICsgdGhpcy5wYXJ0LnN0ZXA7XG4gICAgICAgIH0sIHRoaXMucGlja2VyLnNldHRpbmdzLmhvbGRJbnRlcnZhbCwgdGhpcy5waWNrZXIuc2V0dGluZ3MuZGVib3VuY2VXYWl0KTtcblxuICAgICAgICBuZXcgUHVzaEhvbGRFdmVudCh0aGlzLmVsZW1lbnRzLmRvd24sICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLm51bWVyaWMgLSB0aGlzLnBhcnQuc3RlcDtcbiAgICAgICAgfSwgdGhpcy5waWNrZXIuc2V0dGluZ3MuaG9sZEludGVydmFsLCB0aGlzLnBpY2tlci5zZXR0aW5ncy5kZWJvdW5jZVdhaXQpO1xuXG4gICAgICAgIGlmICh0aGlzLnBpY2tlci5zZXR0aW5ncy5hbGxvd0lucHV0ICYmIHRoaXMucGFydC5udW1lcmljKSB7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMubWV0cmljLm9uaW5wdXQgPSAoZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZhbGlkYXRlKGUudGFyZ2V0LnZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3ZhbGlkYXRpb24tZmFpbGVkJywgZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdpbnB1dCcsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMub25mb2N1cyA9IChlKSA9PiB0aGlzLmVtaXQoJ2ZvY3VzJywgZSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMubWV0cmljLm9ua2V5cHJlc3MgPSAoZSkgPT4gdGhpcy5lbWl0KCdrZXlwcmVzcycsIGUpO1xuXG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXNlIHRoZSB2YWx1ZXNcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICByZXR1cm4gZWxlbWVudDtcblxuICAgIH1cblxuICAgIC8vIFVwZGF0ZXMgdGhlIHNlZ21lbnQgd2l0aCB0aGUgYXBwcm9wcmlhdGUgdmFsdWVzXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBpZiAodGhpcy5yZW5kZXJlZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5tZXRyaWMudmFsdWUgPSB0aGlzLnZhbHVlLmRpc3BsYXk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJ0LmNhcHRpb25Gb3JtYXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5waWNrZXIuX2RhdGVNb21lbnQuZm9ybWF0KHRoaXMucGFydC5jYXB0aW9uRm9ybWF0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wYXJ0LmNhcHRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmNvbW1lbnQuaW5uZXJUZXh0ID0gdGhpcy5wYXJ0LmNhcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuXG4gICAgICAgIC8vIE9ubHkgdmFsaWRhdGUgaWYgd2UgaGF2ZSBlbm91Z2ggaW5wdXQgdG8gZ28gb25cbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHRoaXMucGFydC5pbnB1dExlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKSAtIHRoaXMucGFydC5tb2RpZmllcjtcblxuICAgICAgICBsZXQgdGVzdERhdGUgPSBtb21lbnQodGhpcy5waWNrZXIuX2RhdGVNb21lbnQpW3RoaXMucGFydC5tZXRob2RdKHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gdGVzdERhdGVbdGhpcy5wYXJ0Lm1ldGhvZF0oKSA9PT0gdmFsdWU7XG5cbiAgICB9XG5cbiAgICByZWNhbGN1bGF0ZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy52YWx1ZSk7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLnZhbHVlLm51bWVyaWM7XG4gICAgfVxuXG4gICAgYmluZEV2ZW50cygpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsSW5wdXQgPSB0aGlzLnZhbHVlLmRpc3BsYXk7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgLy8gT25seSBzZXQgdGhlIHZhbHVlIG9uY2UgdGhlIHVzZXIgaGFzIGVudGVyZWQgdGhlIHdob2xlIHZhbHVlXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgbW9tZW50IG1heSBub3QgYmUgYWJsZSB0byBwYXJzZSBmdWxsIGRhdGVcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZS5sZW5ndGggPj0gdGhpcy5wYXJ0LmlucHV0TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcignZm9jdXMnLCAoZSkgPT4gZS50YXJnZXQuc2VsZWN0KCkpO1xuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBjaGFyQ29kZSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlO1xuICAgICAgICAgICAgb3JpZ2luYWxJbnB1dCA9IGUudGFyZ2V0LnZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuICEoY2hhckNvZGUgPiAzMSAmJiAoY2hhckNvZGUgPCA0OCB8fCBjaGFyQ29kZSA+IDU3KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoJ3ZhbGlkYXRpb24tZmFpbGVkJywgKGUpID0+IHtcbiAgICAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gb3JpZ2luYWxJbnB1dDtcblxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlLnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpLCAxMDAwKTtcblxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIC8qXG4gICAgIEV2ZW50c1xuICAgICBUaGlzIHdvdWxkIGlkZWFsbHkgYmUgYSB0cmFpdCwgaG93ZXZlciB0cmFpdHMgYXJlIG5vdCBhIHRoaW5nIGluIEVTNi5cbiAgICAgUm9sbCBvbiBFUzdcbiAgICAgKi9cblxuICAgIGFkZExpc3RlbmVyKGxhYmVsLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5oYXMobGFiZWwpIHx8IHRoaXMubGlzdGVuZXJzLnNldChsYWJlbCwgW10pO1xuICAgICAgICB0aGlzLmxpc3RlbmVycy5nZXQobGFiZWwpLnB1c2goY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGVtaXQobGFiZWwsIC4uLmFyZ3MpIHtcbiAgICAgICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCk7XG5cbiAgICAgICAgaWYgKGxpc3RlbmVycyAmJiBsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn0iLCJpbXBvcnQgeyBzdXBwb3J0c1RvdWNoIH0gZnJvbSAnLi9oZWxwZXJzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHVzaEhvbGRFdmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQsIGNhbGxiYWNrLCBob2xkSW50ZXJ2YWwsIGRlYm91bmNlV2FpdCkge1xuXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcblxuICAgICAgICB0aGlzLmludGVydmFsID0gaG9sZEludGVydmFsO1xuXG4gICAgICAgIHRoaXMuZGVib3VuY2UgPSBkZWJvdW5jZVdhaXQ7XG5cbiAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9pbnRlcnZhbFRpbWVyID0gbnVsbDtcblxuICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG5cbiAgICAgICAgY29uc3Qgc3RhcnRFdmVudHMgPSBzdXBwb3J0c1RvdWNoKCkgPyBbJ29udG91Y2hzdGFydCcsICdvbm1vdXNlZG93biddIDogWydvbm1vdXNlZG93biddO1xuICAgICAgICB0aGlzLl9iaW5kRXZlbnQodGhpcy50YXJnZXQsIHN0YXJ0RXZlbnRzLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbW91c2VEb3duKGUpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGVuZEV2ZW50cyA9IHN1cHBvcnRzVG91Y2goKSA/IFsnb250b3VjaGVuZCcsICdvbm1vdXNldXAnXSA6IFsnb25tb3VzZXVwJ107XG4gICAgICAgIHRoaXMuX2JpbmRFdmVudCh0aGlzLnRhcmdldCwgZW5kRXZlbnRzLCAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fbW91c2VVcChlKVxuICAgICAgICB9KTtcblxuICAgIH1cblxuICAgIF9tb3VzZURvd24oZSkge1xuICAgICAgICAvLyBPbmx5IGZpcmUgMSBldmVudFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLl9pbnRlcnZhbFRpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH0sIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgIH0sIHRoaXMuZGVib3VuY2UpO1xuICAgIH1cblxuICAgIF9tb3VzZVVwKGUpIHtcblxuICAgICAgICAvLyBPbmx5IGZpcmUgMSBldmVudFxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5fY2xlYXIoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2V4ZWN1dGVkKSB7XG4gICAgICAgICAgICAvLyBTaW11bGF0ZSBjbGljayBhcyB3ZSBzdGVhbCB0aGUgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2V4ZWN1dGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgX2NsZWFyKCkge1xuICAgICAgICBpZiAodGhpcy5fdGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gICAgICAgICAgICB0aGlzLl90aW1lciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ludGVydmFsVGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9pbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVydmFsVGltZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2JpbmRFdmVudChlbGVtZW50LCBldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAobGV0IGV2ZW50IG9mIGV2ZW50cykge1xuICAgICAgICAgICAgZWxlbWVudFtldmVudF0gPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59IiwibGV0IHJlbmRlciA9IChzZWxlY3RvcikgPT4ge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBzZWxlY3Rvci5zcGxpdCgnLicpO1xuICAgIGNvbnN0IGVsZW1lbnROYW1lID0gYXR0cmlidXRlcy5zaGlmdCgpO1xuICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnROYW1lKTtcblxuICAgIGZvciAobGV0IGNsYXNzTmFtZSBvZiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyOyIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGRlZmF1bHRzIGZyb20gJy4vbW9kdWxlcy9kZWZhdWx0cyc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vbW9kdWxlcy9yZW5kZXInO1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vbW9kdWxlcy9iYWNrZHJvcCc7XG5pbXBvcnQgUGFydCBmcm9tICcuL21vZHVsZXMvcGFydCc7XG5pbXBvcnQgTW9kYWwgZnJvbSAnLi9tb2R1bGVzL21vZGFsJztcblxuaW1wb3J0IHsgaXNUb3VjaCB9IGZyb20gJy4vbW9kdWxlcy9oZWxwZXJzJztcblxubGV0IHN3ZWV0RGF0ZVBpY2tlcnMgPSBbXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dlZXREYXRlUGlja2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGlucHV0LCBjb25maWcpIHtcblxuICAgICAgICBzd2VldERhdGVQaWNrZXJzLnB1c2godGhpcyk7XG5cbiAgICAgICAgdGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBjb25maWcpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIC8vIFN0b3AgcGVvcGxlIG9uIHRvdWNoIGRldmljZXMgYWNjaWRlbnRhbGx5IGNsaWNraW5nIGEgbnVtYmVyXG4gICAgICAgIC8vIGluc3RlYWQgb2YgdGhlIGFycm93XG4gICAgICAgIGlmIChpc1RvdWNoKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MuYWxsb3dJbnB1dCA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wYXJ0cyA9IFtdO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLmFjdGl2ZVBhcnQgPSAtMTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVEYXRlKCk7XG5cbiAgICAgICAgdGhpcy5jb25zdHJhaW5NYXgoKTtcblxuICAgICAgICB0aGlzLmluaXRpYWxpemVGb3JtKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVGb3JtKCk7XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuaW5wdXQub25jbGljayA9IChlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3coKTtcbiAgICAgICAgICAgIGUudGFyZ2V0LmJsdXIoKTtcbiAgICAgICAgfTtcblxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgcmF3IHZhbHVlIGZyb20gdGhlIGlucHV0XG4gICAgZ2V0VmFsdWUoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMuaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXZhbHVlJykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbnB1dC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgYXNzaWduKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIG1vbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZU1vbWVudCA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGF0ZU1vbWVudCA9IG1vbWVudCh2YWx1ZSwgdGhpcy5zZXR0aW5ncy5zdWJtaXRGb3JtYXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZURhdGUoKSB7XG5cbiAgICAgICAgY29uc3QgcmF3VmFsdWUgPSB0aGlzLmdldFZhbHVlKCk7XG5cbiAgICAgICAgdGhpcy5hc3NpZ24ocmF3VmFsdWUgfHwgdGhpcy5zZXR0aW5ncy5kZWZhdWx0RGF0ZSB8fCB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS12YWx1ZScpKTtcblxuICAgICAgICBpZiAoIXRoaXMuX2RhdGVNb21lbnQgfHwgIXRoaXMuX2RhdGVNb21lbnQuaXNWYWxpZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmFzc2lnbih0aGlzLnNldHRpbmdzLmRlZmF1bHREYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIG5lZWQgdGhlIHBhcnRzIHNvIHdlIGNhbiByb3VuZCB0aGUgZGF0ZSB0byB0aGUgYXBwcm9wcmlhdGUgYW1vdW50IG9mIHN0ZXBzXG4gICAgICAgIHRoaXMuY3JlYXRlUGFydHMoKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5wYXJ0cykge1xuICAgICAgICAgICAgcGFydC5yZWNhbGN1bGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RyYWluTWF4KCkge1xuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5tYXhEYXRlICYmIHRoaXMuc2V0dGluZ3MubWF4RGF0ZSA8IHRoaXMuX2RhdGVNb21lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGVNb21lbnQgPSB0aGlzLnNldHRpbmdzLm1heERhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG93KCkge1xuXG4gICAgICAgIGlmICghdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0aWFsaXplTW9kYWwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIEJhY2tkcm9wLnNob3coKTtcbiAgICAgICAgdGhpcy5tb2RhbC5zaG93KCk7XG5cbiAgICB9XG5cbiAgICBpbml0aWFsaXplTW9kYWwoKSB7XG5cbiAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBNb2RhbCh7c2hvd0NsZWFyOiB0aGlzLnNldHRpbmdzLnNob3dDbGVhcn0pO1xuXG4gICAgICAgIHRoaXMubW9kYWwuYWRkTGlzdGVuZXIoJ2NsZWFyJywgKCkgPT4gdGhpcy5jbGVhcigpKTtcbiAgICAgICAgdGhpcy5tb2RhbC5hZGRMaXN0ZW5lcignc2V0JywgKCkgPT4gdGhpcy5zZXQoKSk7XG5cbiAgICAgICAgdGhpcy5tb2RhbC5yZW5kZXIoKTtcblxuICAgICAgICBmb3IgKGNvbnN0IHBhcnQgb2YgdGhpcy5wYXJ0cykge1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5hZGRQYXJ0KHBhcnQpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjcmVhdGVQYXJ0cygpIHtcbiAgICAgICAgY29uc3QgZm9ybWF0UGFydHMgPSB0aGlzLnNldHRpbmdzLmZvcm1hdC5zcGxpdCgnICcpO1xuXG4gICAgICAgIGZvciAobGV0IGZvcm1hdCBvZiBmb3JtYXRQYXJ0cykge1xuXG4gICAgICAgICAgICBsZXQgcGFydCA9IG5ldyBQYXJ0KHRoaXMsIGZvcm1hdCk7XG5cbiAgICAgICAgICAgIHRoaXMucGFydHMucHVzaChwYXJ0KTtcblxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5wYXJ0cy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICBwYXJ0LnNldFBvc2l0aW9uKGluZGV4KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0dGluZ3Muc3RlcHNbZm9ybWF0XSkge1xuICAgICAgICAgICAgICAgIHBhcnQuc2V0U3RlcHModGhpcy5zZXR0aW5ncy5zdGVwc1tmb3JtYXRdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGFydC5hZGRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNldHRpbmdzLnRhYkZpbGwgJiYgZS50YXJnZXQudmFsdWUubGVuZ3RoID09IHBhcnQucGFydC5pbnB1dExlbmd0aCAmJiBpbmRleCA8IGZvcm1hdFBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHRQYXJ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHBhcnQuYWRkTGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5hY3RpdmVQYXJ0ID0gaW5kZXgpO1xuXG4gICAgICAgICAgICBwYXJ0LmFkZExpc3RlbmVyKCd1cGRhdGUnLCAoZGF0ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGVNb21lbnQgPSBkYXRlO1xuXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhbGwgdGhlIHBhcnRzIHRvIHVwZGF0ZSB0aGVpciBVSVxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhcnQgb2YgdGhpcy5wYXJ0cykge1xuICAgICAgICAgICAgICAgICAgICBwYXJ0LnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRpYWxpemVGb3JtKCkge1xuICAgICAgICB0aGlzLnN1Ym1pdElucHV0ID0gcmVuZGVyKCdpbnB1dCcpO1xuICAgICAgICB0aGlzLnN1Ym1pdElucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdoaWRkZW4nKTtcbiAgICAgICAgdGhpcy5zdWJtaXRJbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnbmFtZScpKTtcbiAgICAgICAgdGhpcy5pbnB1dC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMuc3VibWl0SW5wdXQpO1xuICAgICAgICB0aGlzLmlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnbmFtZScpO1xuICAgIH1cblxuICAgIG5leHRQYXJ0KCkge1xuICAgICAgICBsZXQgbmV4dCA9IHRoaXMuYWN0aXZlUGFydCArIDE7XG5cbiAgICAgICAgaWYgKG5leHQgPj0gdGhpcy5wYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGFydHNbbmV4dF0uZm9jdXMoKTtcbiAgICB9XG5cbiAgICBzZXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlRm9ybSgpO1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLmhpZGUoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdzZXQnLCB0aGlzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVGb3JtKCkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gdGhpcy5fZGF0ZU1vbWVudC5mb3JtYXQodGhpcy5zZXR0aW5ncy5kaXNwbGF5Rm9ybWF0KTtcbiAgICAgICAgdGhpcy5zdWJtaXRJbnB1dC52YWx1ZSA9IHRoaXMuX2RhdGVNb21lbnQuZm9ybWF0KHRoaXMuc2V0dGluZ3Muc3VibWl0Rm9ybWF0KTtcbiAgICB9XG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgdGhpcy5pbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB0aGlzLnN1Ym1pdElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuaGlkZSgpO1xuICAgICAgICB0aGlzLmVtaXQoJ2NsZWFyJywgdGhpcyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGhpZGUoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHN3ZWV0RGF0ZVBpY2tlcnMpO1xuICAgICAgICBmb3IgKGxldCBwaWNrZXIgb2Ygc3dlZXREYXRlUGlja2Vycykge1xuICAgICAgICAgICAgaWYgKHBpY2tlci5tb2RhbCkge1xuICAgICAgICAgICAgICAgIHBpY2tlci5tb2RhbC5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBCYWNrZHJvcC5oaWRlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgRXZlbnRzXG4gICAgIFRoaXMgd291bGQgaWRlYWxseSBiZSBhIHRyYWl0LCBob3dldmVyIHRyYWl0cyBhcmUgbm90IGEgdGhpbmcgaW4gRVM2LlxuICAgICBSb2xsIG9uIEVTN1xuICAgICAqL1xuXG4gICAgYWRkTGlzdGVuZXIobGFiZWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmhhcyhsYWJlbCkgfHwgdGhpcy5saXN0ZW5lcnMuc2V0KGxhYmVsLCBbXSk7XG4gICAgICAgIHRoaXMubGlzdGVuZXJzLmdldChsYWJlbCkucHVzaChjYWxsYmFjayk7XG4gICAgfVxuXG4gICAgZW1pdChsYWJlbCwgLi4uYXJncykge1xuICAgICAgICBsZXQgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZ2V0KGxhYmVsKTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzICYmIGxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKChsaXN0ZW5lcikgPT4ge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG59XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xud2luZG93LlN3ZWV0RGF0ZVBpY2tlciA9IFN3ZWV0RGF0ZVBpY2tlcjtcblxuICAgIHdpbmRvdy5zZHAgPSAoaW5wdXQsIGNvbmZpZykgPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFN3ZWV0RGF0ZVBpY2tlcihpbnB1dCwgY29uZmlnKVxuICAgIH07XG5cbn0gZWxzZSB7XG5hbGVydCgnU3dlZXQgRGF0ZSBQaWNrZXIgaXMgYSBmcm9udGVuZCBtb2R1bGUgYW5kIHJlcXVpcmVzIHRoZSB3aW5kb3cgdmFyLicpXG59Il19


    // Require JS
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return SweetDatePicker;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = SweetDatePicker;
    }

})(window, document);