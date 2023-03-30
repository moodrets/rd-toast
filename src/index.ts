import { RDToast, RDToastOptions } from './rd-toast.js';

const toast = new RDToast({
    hideOnClick: true,
    duration: 5000,
});

const startDuration = 5000;

toast.show('info', 'info toast', { position: 'bottom-left', duration: startDuration });
toast.show('info', 'info toast', { position: 'bottom-right', duration: startDuration });
toast.show('info', 'info toast', { position: 'bottom-center', duration: startDuration });
toast.show('info', 'info toast', { position: 'top-left', duration: startDuration });
toast.show('info', 'info toast', { position: 'top-right', duration: startDuration });
toast.show('info', 'info toast', { position: 'top-center', duration: startDuration });

toast.show('error', 'error toast', { position: 'bottom-left', duration: startDuration });
toast.show('error', 'error toast', { position: 'bottom-right', duration: startDuration });
toast.show('error', 'error toast', { position: 'bottom-center', duration: startDuration });
toast.show('error', 'error toast', { position: 'top-left', duration: startDuration });
toast.show('error', 'error toast', { position: 'top-right', duration: startDuration });
toast.show('error', 'error toast', { position: 'top-center', duration: startDuration });

toast.show('warning', 'warning toast', { position: 'bottom-left', duration: startDuration });
toast.show('warning', 'warning toast', { position: 'bottom-right', duration: startDuration });
toast.show('warning', 'warning toast', { position: 'bottom-center', duration: startDuration });
toast.show('warning', 'warning toast', { position: 'top-left', duration: startDuration });
toast.show('warning', 'warning toast', { position: 'top-right', duration: startDuration });
toast.show('warning', 'warning toast', { position: 'top-center', duration: startDuration });

toast.show('success', 'success toast', { position: 'bottom-left', duration: startDuration });
toast.show('success', 'success toast', { position: 'bottom-right', duration: startDuration });
toast.show('success', 'success toast', { position: 'bottom-center', duration: startDuration });
toast.show('success', 'success toast', { position: 'top-left', duration: startDuration });
toast.show('success', 'success toast', { position: 'top-right', duration: startDuration });
toast.show('success', 'success toast', { position: 'top-center', duration: startDuration });

const $buttons = document.querySelectorAll('.js-button');

$buttons.forEach(($button) => {
    $button.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        let { toastPosition = 'bottom-left', toastText = '', toastType, toastIcon } = target.dataset;
        toast.show(toastType, toastText, { position: toastPosition, icon: toastIcon } as RDToastOptions);
    });
});
