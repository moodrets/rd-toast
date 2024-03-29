// @ts-check

/**
 * @typedef {'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'} RDToastPosition
 */

/**
 * RD Toast plugin options
 * @typedef {Object} RDToastOptions
 * @property {string} [canvasClass=rd-toast-canvas]
 * @property {string} [groupClass=rd-toast-group]
 * @property {string} [iconClass=rd-toast-item-icon]
 * @property {string} [showClass=show]
 * @property {string} [hideClass=hide]
 * @property {string} [toastClass=rd-toast-item]
 * @property {string} [toastContentClass=rd-toast-item-content]
 * @property {string} [icon]
 * @property {string} [type=info] - toast type: info | danger | warning
 * @property {RDToastPosition} [position=bottom-right] - toast position
 * @property {number} [duration=5000] - toast delay before hiding
 * @property {boolean} [hideOnClick=false]
 */

/**
 * RDToast plugin for web page notifications
 */
export class RDToast {
    /**
     * Main div container for toasts
     * @protected
     * @type {Element|null}
     */
    canvas = null;

    /**
     * @protected
     * @type {RDToastOptions}
     */
    defaultSettings = {
        canvasClass: 'rd-toast-canvas',
        groupClass: 'rd-toast-group',
        iconClass: 'rd-toast-item-icon',
        showClass: 'show',
        hideClass: 'hide',
        toastClass: 'rd-toast-item',
        toastContentClass: 'rd-toast-item-content',
        icon: '',
        type: 'info',
        position: 'bottom-right',
        duration: 5000,
        hideOnClick: false,
    };

    /**
     * @param {RDToastOptions} [options] - default global plugin settings
     */
    constructor(options) {
        this.defaultSettings = {
            ...this.defaultSettings,
            ...options,
        };
        this.init();
    }

    /**
     * @public
     * @param {string} type - toast type: info | danger | warning
     * @param {string} text - toast text message
     * @param {RDToastOptions} [options] - custom options
     * @return {Element}
     */
    show(type, text, options = {}) {
        const localOptions = { ...this.defaultSettings, ...options, type };

        const existsContainer = this.canvas?.querySelector(
            `.${this.defaultSettings.groupClass}.position-${localOptions.position}`
        );

        const toast = this.createToast(text, localOptions);

        if (existsContainer) {
            existsContainer.append(toast);
            return toast;
        }

        const toastContainer = this.createContainer(localOptions);

        toastContainer.append(toast);

        this.canvas?.append(toastContainer);

        return toast;
    }

    /**
     * @public
     * @param {Element} toast
     * @param {RDToastOptions} [options]
     * @returns {void}
     */
    drop(toast, options = {}) {
        const localOptions = { ...this.defaultSettings, ...options };
        this.removeToast(toast, localOptions);
    }

    /**
     * @protected
     * @param {string} text
     * @param {RDToastOptions} options
     * @returns {Element}
     * */
    createToast(text, options) {
        const toast = document.createElement('div');

        const toastClassList = [
            options.toastClass || '',
            `type-${options.type}`,
            `position-${options.position}` || '',
            options.showClass || '',
        ];

        toast.classList.add(...toastClassList);

        let iconHTML = options?.icon ? `<div class="${options.iconClass}">${options.icon}</div>` : '';

        toast.innerHTML = `${iconHTML}<div class="${options.toastContentClass}">${text}</div>`;

        const timeout = setTimeout(() => {
            this.removeToast(toast, options);
        }, options.duration);

        if (options.hideOnClick) {
            toast.addEventListener('click', (e) => {
                clearTimeout(timeout);
                this.removeToast(toast, options);
            });
        }

        return toast;
    }

    /**
     * @protected
     * @param {Element} toast
     * @param {RDToastOptions} options
     * @returns {void}
     * */
    removeToast(toast, options) {
        if (options.showClass) {
            toast.classList.remove(options.showClass);
        }

        if (options.hideClass) {
            toast.classList.add(options.hideClass);
        }

        let animationDuration = getComputedStyle(toast).getPropertyValue('animation-duration');

        setTimeout(() => {
            toast.remove();
        }, parseFloat(animationDuration) * 1000);
    }

    /**
     * @protected
     * @param {RDToastOptions} options
     * @returns {Element}
     * */
    createContainer(options) {
        const toastContainer = document.createElement('div');

        toastContainer.classList.add(this.defaultSettings.groupClass || '', `position-${options.position}`);

        return toastContainer;
    }

    /**
     * @protected
     * @returns {void}
     * */
    init() {
        const existsCanvas = document.querySelector(`.${this.defaultSettings.canvasClass}`);

        if (existsCanvas) {
            this.canvas = existsCanvas;
            return;
        }

        this.canvas = document.createElement('div');

        this.canvas.classList.add(this.defaultSettings.canvasClass || '');

        document.body.append(this.canvas);
    }
}
