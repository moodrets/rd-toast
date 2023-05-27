export class RDToast {
    constructor(options) {
        this.canvas = null;
        this.settings = {
            canvasClass: 'rd-toast-canvas',
            groupContainerClass: 'rd-toast-container',
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
        this.settings = {
            ...this.settings,
            ...options,
        };
        this.init();
    }
    show(type = 'info', text = '', options = {}) {
        const localOptions = { ...this.settings, ...options, type };
        const existsContainer = this.canvas?.querySelector(`.${this.settings.groupContainerClass}.position-${localOptions.position}`);
        const toast = this.createToast(text, localOptions);
        if (existsContainer) {
            existsContainer.append(toast);
            return;
        }
        const toastContainer = this.createContainer(localOptions);
        toastContainer.append(toast);
        this.canvas?.append(toastContainer);
    }
    createToast(text, options) {
        const toast = document.createElement('div');
        const toastClassList = [
            options.toastClass || '',
            `type-${options.type}`,
            `position-${options.position}` || '',
            options.showClass || ''
        ];
        toast.classList.add(...toastClassList);
        toast.innerHTML = `<div class="${options.toastContentClass}">${text}</div>`;
        options.icon &&
            toast.insertAdjacentHTML('afterbegin', `<div class="${options.iconClass}">${options.icon}</div>`);
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
    createContainer(options) {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add(this.settings.groupContainerClass, `position-${options.position}`);
        return toastContainer;
    }
    init() {
        const existsCanvas = document.querySelector(`.${this.settings.canvasClass}`);
        if (existsCanvas) {
            this.canvas = existsCanvas;
            return;
        }
        this.canvas = document.createElement('div');
        this.canvas.classList.add(this.settings.canvasClass);
        document.body.append(this.canvas);
    }
}
//# sourceMappingURL=rd-toast.js.map