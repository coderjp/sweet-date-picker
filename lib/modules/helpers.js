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