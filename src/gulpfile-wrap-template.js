;(function(window, document, undefined) {
    "use strict";

    <%= contents %>

    // Require JS
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return SweetDatePicker;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = SweetDatePicker;
    }

})(window, document);