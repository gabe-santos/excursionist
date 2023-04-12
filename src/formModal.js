export const formModal = document.querySelector('.modal');
export const formModalSubmit = document.querySelector('#form-submit');
export const formModalClose = document.querySelector('.close-btn');
export const formEventTitle = document.querySelector('#form-title');
export const formEventDate = document.querySelector('#form-date');
export const formActivityCount = document.querySelector('#form-activity-count');
export const formEventDescription = document.querySelector('#form-description');

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
