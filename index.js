import {
	newItineraryBtn,
	formModal,
	formModalClose,
	formModalSubmit,
} from './src/selectors';
import { openFormModal, closeFormModal } from './src/formModal';
import { updateUI } from './src/uiUpdates';
import { Itinerary } from './src/Itinerary'; // Itinerary Object
import { calendarControl } from './src/calendar';
import { itineraryList, createNewItinerary } from './src/itineraryList';

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = openFormModal;
// Closes form popup when close btn pressed
formModalClose.onclick = closeFormModal;

// Closes form popup when area outside of form window is pressed
window.onclick = e => {
	if (e.target == formModal) closeFormModal();
};

formModalSubmit.onclick = createNewItinerary;

const init = () => {
	const newUserData = new Itinerary(
		'Create a New Itinerary',
		new Date(),
		"Click '+ New Itinerary' to the left to get started!"
	);
	itineraryList[newUserData.key] = newUserData;
	updateUI(itineraryList);
};

addEventListener('load', init); // run init on page load
