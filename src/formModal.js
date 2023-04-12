import {
	formModal,
	formEventTitle,
	formEventDate,
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
	formEventDate.value = '';
	formEventDescription.value = '';
};
