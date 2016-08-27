// (function () {

    var _sweetDatePickers = [];
    var _sweetDatePickerBackdrop;

    function SweetDatePicker (input, config) {

        var self = this,
            formatParts,
            part;

        this.settings = this._merge(config || {}, SweetDatePicker.defaults);

        this.modal = null;

        this.parts = [];

        if (! _sweetDatePickerBackdrop) {
            _sweetDatePickerBackdrop = document.createElement('div');
            _sweetDatePickerBackdrop.className = 'mdp-backdrop';
            _sweetDatePickerBackdrop.onclick = function () {
                SweetDatePicker.close();
            };
        }

        Object.defineProperties(this, {
            date: {
                get: function () {
                    return self._date;
                },
                set: function (value) {
                    self._date = value;
                    self.updateUI();
                }
            }
        });

        this._date = input.getAttribute('data-value') ?
            moment(input.getAttribute('data-value'), this.settings.submitFormat) : moment();

        formatParts = this.settings.format.split(' ');

        for (var i = 0; i < formatParts.length; i++) {
            part = this.parsePart(formatParts[i]);
            part.position = i;
            this.parts.push(part);
        }

        this.nodes();

        // Round provided date to steps
        for (var partIndex = 0; partIndex < this.parts.length; partIndex++) {
            part = this.parts[partIndex];
            part.value = Math.round(part.value.numeric/part.step) * part.step;
        }

        this.input = input;

        // Create the hidden submit element
        this.submitInput = document.createElement('input');
        this.submitInput.setAttribute('type', 'hidden');
        this.input.parentNode.appendChild(this.submitInput);
        this.submitInput.setAttribute('name', this.input.getAttribute('name'));
        this.input.removeAttribute('name');

        this.input.onclick = function () {
            self.showModal();
        };

        this.input.value = this.date.format(this.settings.displayFormat);

        _sweetDatePickers.push(this);

        this.updateUI();

    }

    SweetDatePicker.prototype.parsePart = function (format) {

        var lookup = SweetDatePicker.lookup(format),
            self = this,
            part;

        if (! lookup) throw 'Sweet Date Picker: Unsupported format "' + format + '"';

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

        part = this._merge(lookup, defaults);

        if (! part.method) part.method = part.unit;

        part.step = self.settings.steps[part.format] || part.step;

        Object.defineProperty(part, 'value', {
            get: function () {
                return {
                    display: self._date.format(part.format),
                    numeric: parseInt(self._date[part.method]() + part.modifier)
                }
            },
            set: function (value) {
                value = value - part.modifier;
                self.date = moment(self._date[part.method](value));
            }
        });

        return part;

    };

    SweetDatePicker.prototype.showModal = function () {

        document.querySelector('body').appendChild(this.modal);
        document.querySelector('body').appendChild(_sweetDatePickerBackdrop);

    };

    SweetDatePicker.prototype.hideModal = function () {

        // Don't try to remove it if it isn't visible
        if (! this.modal.parentNode) return false;
        this.modal.parentNode.removeChild(this.modal);

    };

    SweetDatePicker.prototype.nodes = function () {

    var settings = this.settings,
        parts = this.parts,
        _date = this._date,
        self = this,

        createElement = function (selector) {

            var attributes = selector.split('.'),
                element = document.createElement(attributes[0]);

            if (attributes.length > 1) {
                for (var classIndex = 1; classIndex < attributes.length; classIndex++) {
                    element.classList.add(attributes[classIndex]);
                }
            }

            return element;

        },

        createModal = function () {

            return createElement('div.mdp-modal.shown');

        },

        createContainer = function () {

            return createElement('div.mdp-container');

        },

        bindPartInputEvents = function (input, part) {

            input.oninput = function () {

                if (settings.tabFill && this.value.length == part.inputLength && part.position < parts.length) {
                    parts[part.position + 1].el.querySelector('input').focus();
                }

                if (this.value.length == part.inputLength) {
                    part.value = this.value;
                }

                if (this.value.length >= part.inputLength) {
                    this.blur();
                }

            };

            input.onfocus = function () {

                this.select();
                if (part.position == 0) settings.tabFill = true;
                if (part.position == parts.length - 1) settings.tabFill = false;

            };

            input.onkeypress = function (evt) {
                evt = evt || window.event;
                var charCode = evt.which || evt.keyCode,
                    charStr = String.fromCharCode(charCode),
                    val,
                    testDate,
                    resultVal;

                // Has the user selected the text
                if (typeof this.selectionStart == "number" && this.selectionStart == 0 && this.selectionEnd == this.value.length) {
                    this.value = '';
                }

                val = this.value + charStr;

                if (val.length < part.length) return true; // Not enough information to validate it

                val = parseInt(val);

                testDate = moment(_date)[ part.method ](val);

                resultVal = testDate[ part.method ]();

                if (resultVal != val) {
                    if (evt.preventDefault) evt.preventDefault();
                    return false;
                }

                return true;

            };
        },

        createPart = function (part) {
            var partElement = createElement('div.mdp-date-segment-col'),
                segment = partElement.appendChild(createElement('div.mdp-date-segment')),
                children = [
                    'button.up',
                    'input.metric',
                    'div.comment',
                    'button.down'
                ];

            for (var child = 0; child < children.length; child++) {
                segment.appendChild(createElement(children[child]));
            }

            partElement.querySelector('.up').onclick = function () {
                part.value = part.value.numeric + part.step;
            };

            partElement.querySelector('.down').onclick = function () {
                part.value = part.value.numeric - part.step;
            };

            if (settings.allowInput && part.numeric) {
                bindPartInputEvents(partElement.querySelector('input'), part);
            } else {
                partElement.querySelector('input').disabled = true;
            }

            return partElement;

        },

        createActions = function () {

            var actionContainer = createElement('div.mdp-actions'),
                clearBtnWrapper = createElement('div.mdp-btn-wrapper'),
                clearBtn = clearBtnWrapper.appendChild(createElement('button.mdp-clear')),
                setBtnWrapper = createElement('div.mdp-btn-wrapper'),
                setBtn = setBtnWrapper.appendChild(createElement('button.mdp-set'));

            clearBtn.innerText = 'Clear';

            setBtn.innerText = 'Set';

            if (settings.showClear) {
                actionContainer.appendChild(clearBtnWrapper);
                clearBtn.onclick = function () { self.clear(); }
            }

            actionContainer.appendChild(setBtnWrapper);
            setBtn.onclick = function () { self.set(); };

            return actionContainer;

        },

        modal = createModal(),

        container = createContainer(),

        actions = createActions();

    modal.appendChild(container);
    modal.appendChild(actions);

    for (var partIndex = 0; partIndex < this.parts.length; partIndex++) {
        this.parts[partIndex].el = container.appendChild(createPart(this.parts[partIndex]));
    }

    this.modal = modal;

    return this;

};

SweetDatePicker.prototype.updateUI = function () {

    var part;

    for (var i = 0; i < this.parts.length; i++) {

        part = this.parts[i]; //MM / YYYY

        part.el.querySelector('.metric').value = part.value.display;
        if (part.captionFormat) {
            part.el.querySelector('.comment').innerText = this.date.format(part.captionFormat);
        } else if (part.caption) {
            part.el.querySelector('.comment').innerText = part.caption;
        }

    }

};

SweetDatePicker.prototype.days = function () {
    return this._date.daysInMonth();
};

SweetDatePicker.prototype.set = function () {
    this.input.value = this._date.format(this.settings.displayFormat);
    this.submitInput.value = this._date.format(this.settings.submitFormat);
    SweetDatePicker.close();
};

SweetDatePicker.prototype.clear = function () {

    this.input.value = '';
    this.submitInput .value = '';
    SweetDatePicker.close();

};

SweetDatePicker.prototype._merge = function (obj, defaults) {

    for (var opt in defaults) {
        if (! obj.hasOwnProperty(opt)) {
            obj[opt] = defaults[opt];
        }
    }

    return obj;
};

SweetDatePicker.prototype.defineSetterGetter = function (part) {

    var obj = {};

    obj[part.unit] = {
        get: function () {
            var numeric = this._date[part.method]() + part.modifier;
            return {
                display: this._date.format(part.format),
                numeric: parseInt(numeric)
            }
        },
        set: function (value) {
            value = value - part.modifier;
            this.date = moment(this._date[part.method](value));
        }
    };

    Object.defineProperties(this, obj);
};

SweetDatePicker.close =  function () {

    for (var i = 0; i < _sweetDatePickers.length; i++) {
        _sweetDatePickers[i].hideModal();
    }

    _sweetDatePickerBackdrop.parentNode.removeChild(_sweetDatePickerBackdrop)
};

SweetDatePicker.defaults =  {
    format: 'D M YYYY',
    displayFormat: 'dddd, MMMM Do YYYY',
    submitFormat: 'YYYY-MM-DD',
    allowInput: true,
    tabFill: true,
    showClear: true,
    steps: {}
};

SweetDatePicker.lookup = function (format) {
    var lookupTable = {
        'YYYY'  : { unit: 'year', inputLength: 4 },
        'YY'    : { unit: 'year', inputLength: 2 },
        'M'     : { unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1 },
        'MM'    : { unit: 'month', captionFormat: 'MMMM', inputLength: 2, modifier: 1 },
        'MMM'   : { unit: 'month', inputLength: 3, numeric: false, modifier: 1 },
        'MMMM'  : { unit: 'month', inputLength: 8, numeric: false, modifier: 1},
        'D'     : { unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date' },
        'DD'    : { unit: 'day', captionFormat: 'dddd', inputLength: 2, method: 'date' },
        'DDD'   : { unit: 'day', inputLength: 3, numeric: false, method: 'date' },
        'DDDD'  : { unit: 'day', inputLength: 9, numeric: false, method: 'date' },
        'H'     : { unit: 'hour', caption: 'Hours', inputLength: 2 },
        'HH'    : { unit: 'hour', caption: 'Hours', inputLength: 2 },
        'h'     : { unit: 'hour', caption: 'Hours', inputLength: 2 },
        'hh'    : { unit: 'hour', caption: 'Hours', inputLength: 2 },
        'm'     : { unit: 'minute', caption: 'Minutes', inputLength: 2 },
        'mm'    : { unit: 'minute', caption: 'Minutes', inputLength: 2 },
        's'     : { unit: 'second', caption: 'Seconds', inputLength: 2 },
        'ss'    : { unit: 'second', caption: 'Seconds', inputLength: 2 }
    };

    return lookupTable[format] || null;
};

// Helpers
function sdp (input, config) {
    return new SweetDatePicker(input, config);
}

if (window.jQuery) {
    jQuery.fn.sdp = function(config) {
        var instances = [];
        for (var i = 0; i < this.length; i++) {
            instances.push(sdp(this[i], config));
        }
        return instances.length == 1 ? instances[0] : instances;
    }
}

// })();
