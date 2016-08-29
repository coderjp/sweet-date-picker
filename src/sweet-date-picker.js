// (function () {

    var _sweetDatePickers = [];
    var _sweetDatePickerBackdrop;

    function SweetDatePicker (input, config) {

        var self = this,
            formatParts,
            part,
            evt,
            evtSettingName,
            settings,
            initialisedWithDate = true;

        this.settings = settings = this._merge(config || {}, SweetDatePicker.defaults);

        if (settings.allowInput && SweetDatePicker.isTouch()) {
            settings.allowInput = false;
        }

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
                    self.set();
                }
            }
        });

        if (input.getAttribute('data-value')) {
            this._date = moment(input.getAttribute('data-value'), this.settings.submitFormat);
        } else if (input.value.length > 0) {
            this._date = moment(input.value, this.settings.submitFormat);
        }

        if (! this._date || ! this._date.isValid()) {
            initialisedWithDate = false;
            this._date = moment();
        }

        // Enforce the max date on init
        if (this.settings.maxDate && this.settings.maxDate < this._date) {
            this._date = this.settings.maxDate;
        }

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
            this.blur();
        };

        _sweetDatePickers.push(this);

        this.updateUI();

        if (initialisedWithDate) {
            this.updateInputs();
        }

        // Bind Events
        for (var i = 0; i < SweetDatePicker.events.length; i++) {
            evt = SweetDatePicker.events[i];
            evtSettingName = 'on' + evt.charAt(0).toUpperCase() + evt.slice(1);
            if (this.settings[evtSettingName]) {
                this.on(evt, function (e) {
                    settings[evtSettingName](e);
                }.bind(this));
            }
        }

        return this;

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
                var newDate;

                value = value - part.modifier;
                newDate = moment(self._date)[part.method](value);

                if (self.settings.maxDate && self.settings.maxDate < newDate) {
                    return;
                }

                self._date = newDate;
                self.updateUI();
            }
        });

        return part;

    };

    SweetDatePicker.prototype.showModal = function () {

        var modal = this.modal;

        document.querySelector('body').appendChild(modal);
        document.querySelector('body').appendChild(_sweetDatePickerBackdrop);
        document.querySelector('html').classList.add('mdp-freeze');

        // IOS still scrolls with the css class. This forces it to obey.
        document.ontouchmove = function(e){
            e.preventDefault();
        };

        this.fireEvent('opened');

        setTimeout(function () {
            modal.classList.add('shown');
        }, 10);

    };

    SweetDatePicker.prototype.hideModal = function () {

        var modal = this.modal;

        // Don't try to remove it if it isn't visible
        if (! modal.parentNode) return false;
        modal.classList.remove('shown');
        setTimeout(function () {
            if (! modal.parentNode) return false;
            modal.parentNode.removeChild(modal);
            document.querySelector('html').classList.remove('mdp-freeze');

            // Allow scroll on IOS again
            document.ontouchmove = function(e){
                return true;
            };
        }, 200)

        this.fireEvent('closed');
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

            var makeString = 'div.mdp-modal';

            if (SweetDatePicker.isTouch()) {
                makeString += '.touch';
            }

            return createElement(makeString);

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

                // Only allow numeric values
                if (isNaN(parseFloat(val)) && !isFinite(val)) {
                    if (evt.preventDefault) evt.preventDefault();
                    return false;
                }

                if (val.length < part.inputLength) return true; // Not enough information to validate it

                val = parseInt(val) - part.modifier;

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
                ],
                up,
                down,
                mouseUp,
                mouseDown,
                addEvent,
                mouseDownTimer,
                mouseDownInterval,
                Timeout;

            for (var child = 0; child < children.length; child++) {
                segment.appendChild(createElement(children[child]));
            }

            Timeout = function (fn, interval) {
                var id = setTimeout(function () {
                    this.executed = true;
                    fn();
                }.bind(this), interval );
                this.cleared = false;
                this.executed = false;
                this.clear = function () {
                    this.cleared = true;
                    clearTimeout(id);
                };
            };

            up = function () {
                part.value = part.value.numeric + part.step;
            };

            down = function () {
                part.value = part.value.numeric - part.step;
            };

            mouseUp  = function (cb) {
                if (!mouseDownTimer.executed) {
                    mouseDownTimer.clear();
                    cb(); // Simulate click as we steal the event
                }
                clearInterval(mouseDownInterval);
            };

            mouseDown = function (cb) {
                mouseDownTimer = new Timeout(function () {
                    mouseDownInterval = setInterval(function () {
                        cb();
                    }, settings.holdInterval);
                }, settings.debounceWait);
            };
            
            addEvent = function (el, events, cb) {
                for (var i = 0; i < events.length; i++) {
                    el[events[i]] = function (e) {
                        cb(e);
                    }
                }
            };

            // Up Arrow Events

            addEvent(partElement.querySelector('.up'), ['ontouchstart', 'onmousedown'], function (e) {

                // Only allow 1 of these events to fire
                e.preventDefault();

                mouseDown(function () {
                    up();
                });

            });

            addEvent(partElement.querySelector('.up'), ['ontouchend', 'onmouseup'], function () {
                mouseUp(function () {
                    up();
                });
            });



            // Down Arrow Events

            addEvent(partElement.querySelector('.down'), ['ontouchstart', 'onmousedown'], function (e) {

                // Only allow 1 of these events to fire
                e.preventDefault();

                mouseDown(function () {
                    down();
                });

            });

            addEvent(partElement.querySelector('.down'), ['ontouchend', 'onmouseup'], function () {
                mouseUp(function () {
                    down();
                });
            });


            // Disable the inputs if the user is on a touch device , otherwise
            // it will cause the keyboard to pop up should they slightly miss the arrow.
            

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
            setBtn.onclick = function () {
                self.set();
                SweetDatePicker.close();
            };

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
    var date = this._date.format(this.settings.submitFormat);
    this.fireEvent('set', {newValue: date});
    this.updateUI();
    this.updateInputs();
};

SweetDatePicker.prototype.updateInputs = function () {
    this.input.value = this._date.format(this.settings.displayFormat);
    this.submitInput.value = this._date.format(this.settings.submitFormat);
};

SweetDatePicker.prototype.clear = function () {

    this.input.value = '';
    this.submitInput .value = '';
    this.fireEvent('clear');
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

SweetDatePicker.prototype.fireEvent = function (eventName, data) {
    var ev;

    data = data || {};

    if (document.createEvent) {
        ev = document.createEvent('HTMLEvents');
        ev.initEvent(eventName, true, false);
        ev.firedBy = this;
        for (dataKey in data) {
            ev[dataKey] = data[dataKey];
        }
        this.input.dispatchEvent(ev);
    } else if (document.createEventObject) {
        ev = document.createEventObject();
        for (dataKey in data) {
            ev[dataKey] = data[dataKey];
        }
        this.input.fireEvent('on' + eventName, ev);
    }
};

SweetDatePicker.prototype.on = function(eventName, callback)
{
    if (!!window.addEventListener) {
        this.input.addEventListener(eventName, callback, false);
    } else {
        this.input.attachEvent('on' + eventName, callback);
    }
},

SweetDatePicker.close =  function () {

    for (var i = 0; i < _sweetDatePickers.length; i++) {
        _sweetDatePickers[i].hideModal();
    }

    setTimeout(function () {
        // Just in case it has already been hidden by this point
        if (_sweetDatePickerBackdrop.parentNode) {
            _sweetDatePickerBackdrop.parentNode.removeChild(_sweetDatePickerBackdrop);
        }
    }, 200)
};

SweetDatePicker.defaults =  {
    format: 'D M YYYY',
    displayFormat: 'dddd, MMMM Do YYYY',
    submitFormat: 'YYYY-MM-DD',
    allowInput: true,
    tabFill: true,
    showClear: true,
    steps: {},
    debounceWait: 400,
    holdInterval: 50
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

SweetDatePicker.events = ['set', 'closed', 'opened', 'clear'];

SweetDatePicker.isTouch = function () {
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    } else {
        return false;
    }
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
