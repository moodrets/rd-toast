// @ts-check

import { RDToast } from './rd-toast.js';

const toast = new RDToast({
    hideOnClick: true,
    duration: 5000,
});

toast.show('info', 'info toast', { position: 'bottom-left' });
toast.show('info', 'info toast', { position: 'bottom-right' });
toast.show('info', 'info toast', { position: 'bottom-center' });
toast.show('info', 'info toast', { position: 'top-left' });
toast.show('info', 'info toast', { position: 'top-right' });
toast.show('info', 'info toast', { position: 'top-center' });
toast.show('error', 'error toast', { position: 'bottom-left' });
toast.show('error', 'error toast', { position: 'bottom-right' });
toast.show('error', 'error toast', { position: 'bottom-center' });
toast.show('error', 'error toast', { position: 'top-left' });
toast.show('error', 'error toast', { position: 'top-right' });
toast.show('error', 'error toast', { position: 'top-center' });
toast.show('warning', 'warning toast', { position: 'bottom-left' });
toast.show('warning', 'warning toast', { position: 'bottom-right' });
toast.show('warning', 'warning toast', { position: 'bottom-center' });
toast.show('warning', 'warning toast', { position: 'top-left' });
toast.show('warning', 'warning toast', { position: 'top-right' });
toast.show('warning', 'warning toast', { position: 'top-center' });
toast.show('success', 'success toast', { position: 'bottom-left' });
toast.show('success', 'success toast', { position: 'bottom-right' });
toast.show('success', 'success toast', { position: 'bottom-center' });
toast.show('success', 'success toast', { position: 'top-left' });
toast.show('success', 'success toast', { position: 'top-right' });
toast.show('success', 'success toast', { position: 'top-center' });

const $buttons = document.querySelectorAll('.js-button');

$buttons.forEach(($button) => {
    $button.addEventListener('click', (e) => {
        const target = e.target;
        let { toastPosition = 'bottom-left', toastText = '', toastType, toastIcon } = target.dataset;
        console.log(toastIcon);
        toast.show(toastType, toastText, { position: toastPosition, icon: toastIcon, duration: 100000 });
    });
});
