import render from './render';
import { isTouch } from './helpers';

export default class Modal {

    constructor(settings) {

        this.settings = settings;

        this.listeners = new Map();

        this.modal = render('div.sdp-modal.hide');

        if (isTouch()) {
            this.modal.classList.add('touch');
        }

        let closeBtn = render('button.close');
        closeBtn.onclick = () => SweetDatePicker.hide();

        this.modal.appendChild(closeBtn);

        this.container = render('div.sdp-container');

        this.modal.appendChild(this.container);

        // Actions
        let actionContainer = render('div.sdp-actions');
        let clearBtnWrapper = render('div.sdp-btn-wrapper');
        let clearBtn = render('button.sdp-clear');
        let setBtnWrapper = render('div.sdp-btn-wrapper');
        let setBtn = render('button.sdp-set');

        clearBtnWrapper.appendChild(clearBtn);
        setBtnWrapper.appendChild(setBtn);

        clearBtn.innerText = 'Clear';

        setBtn.innerText = 'Set';

        if (this.settings.showClear) {
            actionContainer.appendChild(clearBtnWrapper);
            clearBtn.onclick = () => this.emit('clear');
        }

        actionContainer.appendChild(setBtnWrapper);

        setBtn.onclick = () => this.emit('set');

        this.modal.appendChild(actionContainer);
    }

    render() {
        document.querySelector('body').appendChild(this.modal);
    }

    addPart(part) {
        this.container.appendChild(part.render());
    }

    show() {
        this.modal.classList.remove('hide');
    }

    hide() {
        this.modal.classList.add('hide');
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