let sweetDatePickers = [];

class SweetDatePicker {

    constructor(input, config = {}) {

        sweetDatePickers.push(this);

        this.settings = Object.assign({}, config, {
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
        });

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

        this.input.onclick = (e) => {
            this.show();
            e.target.blur();
        };

    }

    // Get the raw value from the input
    getValue() {

        if (this.input.getAttribute('data-value')) {
            return this.input.getAttribute('data-value')
        }

        if (this.input.value.length > 0) {
            return this.value;
        }

    }

    assign(value) {
        if (value instanceof moment) {
            this._dateMoment = value;
        } else {
            this._dateMoment = moment(value, this.settings.submitFormat);
        }
    }

    initializeDate() {
        const rawValue = this.getValue();
        if (rawValue) {
            this.assign(rawValue);
        }

        if (! this._dateMoment || ! this._dateMoment.isValid()) {
            this.assign(this.settings.defaultDate);
        }
    }

    constrainMax() {
        if (this.settings.maxDate && this.settings.maxDate < this._dateMoment) {
            this._dateMoment = this.settings.maxDate;
        }
    }

    show() {

        if (! this.initialized) {
            this.initializeModal();
            this.initializeForm();
        }

        SweetDatePickerBackdrop.show();

    }

    initializeModal() {

        this.buildModal();

        // Create the parts
        const formatParts = this.settings.format.split(' ');

        for (let format of formatParts) {

            let part = new SweetDatePickerPart(this, format);

            this.parts.push(part);

            let index = this.parts.length - 1;

            part.setPosition(index);

            if (this.settings.steps[format]) {
                part.setSteps(this.settings.steps[format]);
            }

            part.addListener('input', (e) => {
                if (this.settings.tabFill && e.target.value.length == part.part.inputLength && index < formatParts.length) {
                    this.nextPart();
                }
            });

            part.addListener('focus', () => this.activePart = index);

            part.addListener('update', (date) => {
                this._dateMoment = date;

                // Trigger all the parts to update their UI
                for (let part of this.parts) {
                    part.update();
                }

            });

            // TODO - don't like need ref to container
            this.modal.querySelector('.mdp-container').appendChild(part.render())

        }



    }

    initializeForm() {
        this.submitInput = SweetDatePickerRenderer.render('input');
        this.submitInput.setAttribute('type', 'hidden');
        this.submitInput.setAttribute('name', this.input.getAttribute('name'));
        this.input.parentNode.appendChild(this.submitInput);
        this.input.removeAttribute('name');
    }

    nextPart() {
        let next = this.activePart + 1;

        if (next >= this.parts.length) {
            return false;
        }

        this.parts[next].focus();
    }

    buildModal() {

        this.modal = SweetDatePickerRenderer.render('div.mdp-modal.hide');
        if (this.constructor.isTouch()) { this.modal.classList.add('touch'); }

        let closeBtn = SweetDatePickerRenderer.render('button.close');
        closeBtn.onclick = () => this.constructor.hide();
        this.modal.appendChild(closeBtn);

        let container = SweetDatePickerRenderer.render('div.mdp-container');

        this.modal.appendChild(container);

        // Actions
        let actionContainer = SweetDatePickerRenderer.render('div.mdp-actions');
        let clearBtnWrapper = SweetDatePickerRenderer.render('div.mdp-btn-wrapper');
        let clearBtn = SweetDatePickerRenderer.render('button.mdp-clear');
        let setBtnWrapper = SweetDatePickerRenderer.render('div.mdp-btn-wrapper');
        let setBtn = SweetDatePickerRenderer.render('button.mdp-set');

        clearBtnWrapper.appendChild(clearBtn);
        setBtnWrapper.appendChild(setBtn);

        clearBtn.innerText = 'Clear';

        setBtn.innerText = 'Set';

        if (this.settings.showClear) {
            actionContainer.appendChild(clearBtnWrapper);
            clearBtn.onclick = () => this.clear();
        }

        actionContainer.appendChild(setBtnWrapper);

        setBtn.onclick = () => {
            this.input.value = this._dateMoment.format(this.settings.displayFormat);
            this.submitInput.value = this._dateMoment.format(this.settings.submitFormat);
            this.constructor.hide();
        };

        this.modal.appendChild(actionContainer);

        document.querySelector('body').appendChild(this.modal);

    }

    clear() {
        this.input.value = '';
        this.submitInput.value = '';
        this.constructor.hide();
        //TODO - Implement clear event
    }

    static isTouch() {
        return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
    }

    static supportsTouch() {
        return 'ontouchstart' in window;
    }

    static hide() {
        for (let picker of sweetDatePickers) {
            picker.modal.classList.add('hide');
        }

        SweetDatePickerBackdrop.hide();
    }

}

class SweetDatePickerPart {

    constructor(picker, format) {

        this.picker = picker;

        this.listeners = new Map();

        const table = {
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

        const defaults = {
            caption: null,
            captionFormat: null,
            numeric: true,
            modifier: 0,
            el: null,
            step: 1,
            inputLength: null,
            format: format
        };

        const lookup = table[format] || null;

        if (! lookup) {
            throw 'Sweet Date Picker: Unsupported format "' + format + '"';
        }

        this.part = Object.assign({}, defaults, lookup);

        this.elements = {};

        if (! this.part.method) this.part.method = this.part.unit;

    }

    setPosition (position) {
        this.position = position;
    }

    setSteps (steps) {
        this.part.step = steps;
    }

    get value () {
        return {
            display: this.picker._dateMoment.format(this.part.format),
            numeric: parseInt(this.picker._dateMoment[this.part.method]() + this.part.modifier)
        };
    }

    set value (value) {

        value-= this.part.modifier;

        const newDate = moment(this.picker._dateMoment)[this.part.method](value);

        if (this.picker.settings.maxDate && this.picker.settings.maxDate < newDate) {
            return;
        }

        this.emit('update', newDate);

        //this.picker._dateMoment = newDate;
        this.update();

    }

    focus() {
        console.log('focus', this.elements.metric);
        this.elements.metric.focus();
    }

    render () {

        const element = SweetDatePickerRenderer.render('div.mdp-date-segment-col');
        const segment = SweetDatePickerRenderer.render('div.mdp-date-segment');

        element.appendChild(segment);

        this.elements = {
            up: segment.appendChild(SweetDatePickerRenderer.render('button.up')),
            metric: segment.appendChild(SweetDatePickerRenderer.render('input.metric')),
            comment: segment.appendChild(SweetDatePickerRenderer.render('div.comment')),
            down: segment.appendChild(SweetDatePickerRenderer.render('button.down'))
        };

        new SweetDatePickerPushHoldEvent(this.elements.up, () => {
            this.value = this.value.numeric + this.part.step;
        }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

        new SweetDatePickerPushHoldEvent(this.elements.down, () => {
            this.value = this.value.numeric - this.part.step;
        }, this.picker.settings.holdInterval, this.picker.settings.debounceWait);

        // TODO, picker send part settings over to part class rather than me referencing them up the tree here.

        if (this.picker.settings.allowInput && this.part.numeric) {

            this.elements.metric.oninput = (e) => {

                if (! this.validate(e.target.value)) { this.emit('validation-failed', e) };

                this.emit('input', e);
            };

            this.elements.metric.onfocus = (e) => this.emit('focus', e);

            this.elements.metric.onkeypress = (e) => this.emit('keypress', e);


        } else {

            this.elements.metric.disabled = true;

        }

        this.bindEvents();

        // Initialise the values
        this.update();

        return element;

    }

    // Updates the segment with the appropriate values
    update() {
        this.elements.metric.value = this.value.display;
        if (this.part.captionFormat) {
            this.elements.comment.innerText = this.picker._dateMoment.format(this.part.captionFormat);
        } else if (this.part.caption) {
            this.elements.comment.innerText = this.part.caption;
        }
    }

    validate(value) {

        // Only validate if we have enough input to go on
        if (value.length < this.part.inputLength) { return true; }

        value = parseInt(value) - this.part.modifier;

        let testDate = moment(this.picker._dateMoment)[this.part.method](value);

        return testDate[this.part.method]() === value;

    }

    bindEvents() {
        let originalInput = this.value.display;

        this.addListener('input', (e) => {
            // Only set the value once the user has entered the whole value
            // otherwise moment may not be able to parse full date
            if (e.target.value.length >= this.part.inputLength) {
                this.value = e.target.value;
                e.target.blur();
            }
        });

        this.addListener('focus', (e) => e.target.select());

        this.addListener('keypress', (e) => {
            let charCode = e.which || e.keyCode;
            originalInput = e.target.value;
            return !(charCode > 31 && (charCode < 48 || charCode > 57));
        });

        this.addListener('validation-failed', (e) => {
            e.target.value = originalInput;

            e.target.classList.add('error');

            setTimeout(() => e.target.classList.remove('error'), 1000);

        });

    }

    /*
    Events
    This would ideally be a trait, however traits are not a thing in ES6.
    Roll on ES7
     */

    addListener(label, callback) {
        this.listeners.has(label) || this.listeners.set(label, []);
        this.listeners.get(label).push(callback);
    }

    emit(label, ...args) {
        let listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }
}



class SweetDatePickerBackdrop {

    static getElement() {
        return document.getElementsByClassName('mdp-backdrop')[0] || null;
    }

    static show() {
        if (! this.getElement()) {
            this.render();
        } else {
            this.getElement().classList.remove('hidden');
        }
    }

    static hide() {
        this.getElement().classList.add('hide');
    }

    static render() {
        const element = document.createElement('div');
        element.className = 'mdp-backdrop';
        element.onclick = () => this.hide();
        document.querySelector('body').appendChild(element);
    }

}

class SweetDatePickerRenderer {
    static render(selector) {
        const attributes = selector.split('.');
        const elementName = attributes.shift();
        const element = document.createElement(elementName);

        for (let className of attributes) {
            element.classList.add(className);
        }

        return element;
    }
}

class SweetDatePickerPushHoldEvent {

    constructor(target, callback, holdInterval, debounceWait) {

        this.target = target;

        this.callback = callback;

        this.interval = holdInterval;

        this.debounce = debounceWait;

        this._executed = false;

        this._intervalTimer = null;

        this._timer = null;

        const startEvents = SweetDatePicker.supportsTouch() ? ['ontouchstart', 'onmousedown'] : ['onmousedown'];
        this._bindEvent(this.target, startEvents, (e) => { this._mouseDown(e) });

        const endEvents = SweetDatePicker.supportsTouch() ? ['ontouchend', 'onmouseup'] : ['onmouseup'];
        this._bindEvent(this.target, endEvents, (e) => { this._mouseUp(e) });

    }

    _mouseDown(e) {
        // Only fire 1 event
        e.preventDefault();

        this._timer = setTimeout(() => {

            this._executed = true;

            this._intervalTimer = setInterval(() => {
                this.callback();
            }, this.interval);

        }, this.debounce);
    }

    _mouseUp(e) {

        // Only fire 1 event
        e.preventDefault();

        this._clear();

        if (! this._executed) {
            // Simulate click as we steal the event
            this.callback();
        }

        this._executed = false;
    }

    _clear() {
        if (this._timer !== null) {
            clearTimeout(this._timer);
            this._timer = null;
        }
        if (this._intervalTimer !== null) {
            clearTimeout(this._intervalTimer);
            this._intervalTimer = null;
        }
    }

    _bindEvent(element, events, callback) {
        for (let event of events) {
            element[event] = function (e) {
                callback(e);
            }
        }
    }

}