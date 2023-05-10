import {
	newItineraryBtn,
	form,
	formModal,
	formModalClose,
	formModalSubmit,
	formEventTitle,
	formEventDateStart,
	formEventDateEnd,
	formEventDescription,
} from './src/selectors';
import { openFormModal, closeFormModal } from './src/formModal';
import { updateUI } from './src/uiUpdates';
// import { Itinerary } from './src/Itinerary'; // Itinerary Object
import { calendarControl } from './src/calendar';
import { itineraryList, addNewItinerary } from './src/itineraryList';

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = openFormModal;
// Closes form popup when close btn pressed
formModalClose.onclick = closeFormModal;

// Closes form popup when area outside of form window is pressed
window.onclick = e => {
	if (e.target == formModal) closeFormModal();
};

// form.addEventListener('submit', e => {
// 	e.preventDefault();
// 	// Get values of input fields
// 	const title = formEventTitle.value;
// 	const dateStart = formEventDateStart.value;
// 	const dateEnd = formEventDateEnd.value;
// 	const description = formEventDescription.value;

// 	// Check if required inputs are filled
// 	if (
// 		title.trim() === '' ||
// 		dateStart.trim() === '' ||
// 		dateEnd.trim() === '' ||
// 		description.trim() === ''
// 	) {
// 		alert('Please fill all required fields.');
// 		return;
// 	}

// 	// Call the function to add new itinerary
// 	addNewItinerary(title, dateStart, dateEnd, description);
// });

const init = () => {
	addNewItinerary('Create a New Itinerary', new Date(), new Date(), [
		"Click '+ New Itinerary' to the left to get started!",
	]);

	let tempList;

	fetch('http://localhost:3001/data')
		.then(response => response.json())
		.then(data => {
			console.log(data); // Process the received data
			data.forEach(item => {
				addNewItinerary(
					item.title,
					item.dateStart,
					item.dateEnd,
					JSON.parse(item.activities)
				);
			});
		})
		.catch(error => {
			console.error('Error:', error); // Handle any error that occurred
		});

	updateUI(itineraryList);

	const today = new Date();
	const twoDaysFromToday = new Date(today);
	twoDaysFromToday.setDate(today.getDate() + 2);

	// calendarControl.highlightDate(twoDaysFromToday);
};

addEventListener('load', init); // run init on page load
