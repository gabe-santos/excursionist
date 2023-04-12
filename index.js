import { newItineraryBtn } from './src/selectors';
import {
	formModal,
	formModalClose,
	formModalSubmit,
	formEventTitle,
	formEventDate,
	formActivityCount,
	formEventDescription,
	openFormModal,
	closeFormModal,
} from './src/formModal';
import { updateUI } from './src/uiUpdates';
import { Itinerary } from './src/Itinerary'; // Itinerary Object
import { calendarControl } from './src/calendar';
import { itineraryList } from './src/itineraryList';

const newUserData = new Itinerary(
	'Create a New Itinerary',
	new Date(),
	"Click '+ New Itinerary' to the left to get started!"
);
itineraryList[newUserData.key] = newUserData;

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = openFormModal;
// Closes form popup when close btn pressed
formModalClose.onclick = closeFormModal;

// Closes form popup when area outside of form window is pressed
window.onclick = e => {
	if (e.target == formModal) closeFormModal();
};

const createNewItinerary = e => {
	e.preventDefault();

	const newEntry = new Itinerary(
		formEventTitle.value,
		formEventDate.value,
		formEventDescription.value
	);

	itineraryList[newEntry.key] = newEntry;

	// Update the UI to display the newly created Itinerary
	updateUI(itineraryList);

	closeFormModal();
};

formModalSubmit.onclick = createNewItinerary;

const init = () => {};

addEventListener('load', init); // run init on page load
updateUI(itineraryList);
