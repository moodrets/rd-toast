type RDToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface RDToastOptions {
    canvasClass: string;
    groupContainerClass: string;
    iconClass: string;
    showClass: string;
    hideClass: string;
    toastClass: string;
    toastContentClass: string;
    icon: string;
    type: string;
    position: RDToastPosition;
    duration: number;
    hideOnClick: boolean;
}

export class RDToast {
    protected canvas: HTMLElement | null = null;

    protected settings: RDToastOptions = {
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

    constructor(options: Partial<RDToastOptions>) {
        this.settings = {
            ...this.settings,
            ...options,
        };
        this.init();
    }

    public show(type: string = 'info', text: string = '', options: Partial<RDToastOptions>) {
        const localOptions = { ...this.settings, ...options, type };

        const existContainer = this.canvas?.querySelector(
            `.${this.settings.groupContainerClass}.position-${localOptions.position}`
        );

        const toast = this.createToast(text, localOptions);

        if (existContainer) {
            existContainer.append(toast);
            return;
        }

        const toastContainer = this.createContainer(localOptions);

        toastContainer.append(toast);

        this.canvas?.append(toastContainer);
    }

    protected createToast(text: string, options: Partial<RDToastOptions>) {
        const toast = document.createElement('div');
        const toastClassList = [options.toastClass || '', `type-${options.type}`, options.showClass || ''];

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

    protected removeToast(toast: HTMLElement, options: Partial<RDToastOptions>) {
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

    protected createContainer(options: Partial<RDToastOptions>) {
        const toastContainer = document.createElement('div');

        toastContainer.classList.add(this.settings.groupContainerClass, `position-${options.position}`);

        return toastContainer;
    }

    protected init(): void {
        this.canvas = document.createElement('div');

        this.canvas.classList.add(this.settings.canvasClass);

        document.body.append(this.canvas);
    }
}
