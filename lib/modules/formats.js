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