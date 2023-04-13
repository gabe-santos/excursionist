import {
	formModal,
	formEventTitle,
	formEventDateStart,
	formEventDateEnd,
	formEventDescription,
} from './selectors';

export const openFormModal = () => {
	formModal.style.display = 'block';
};

export const closeFormModal = () => {
	clearFormModal();
	formModal.style.display = 'none';
};

const clearFormModal = () => {
	formEventTitle.value = '';
	formEventDateStart.value = '';
	formEventDateEnd.value = '';
	formEventDescription.value = '';
};
