import {
	formEventTitle,
	formEventDate,
	formEventDescription,
} from './selectors';
import { Itinerary } from './Itinerary';
import { updateUI } from './uiUpdates';
import { closeFormModal } from './formModal';

export const itineraryList = {};

export const createNewItinerary = e => {
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
