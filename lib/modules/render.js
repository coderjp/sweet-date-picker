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