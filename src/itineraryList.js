import { Itinerary } from './Itinerary';
import { updateUI } from './uiUpdates';
import { closeFormModal } from './formModal';

export const itineraryList = {};

export const addNewItinerary = (title, id, dateStart, dateEnd, activityArr) => {
	const newEntry = new Itinerary(title, id, dateStart, dateEnd, activityArr);

	itineraryList[newEntry.key] = newEntry;

	// Update the UI to display the newly created Itinerary
	updateUI(itineraryList);

	closeFormModal();
};
