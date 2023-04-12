import {
	itineraryUl,
	eventTitle,
	eventDate,
	eventActivityCount,
	eventDescription,
} from './selectors';
import { itineraryList } from './itineraryList';

const switchItineraryDisplay = e => {
	updateItineraryDisplay(itineraryList[e.target.id]);
};

const updateSidebar = data => {
	itineraryUl.innerHTML = '';
	for (const key in data) {
		const it = data[key];
		const itineraryLi = document.createElement('li');
		itineraryLi.innerHTML = `<button class="itinerary-list-item" id="${key}">${it.title}</button>`;
		itineraryLi.addEventListener('click', switchItineraryDisplay);
		itineraryUl.appendChild(itineraryLi);
	}
};

const updateItineraryDisplay = itinerary => {
	eventTitle.textContent = itinerary.title;
	eventDate.textContent = itinerary.date
		? itinerary.getDateString()
		: 'No Date';
	eventActivityCount.textContent = itinerary.activityCount + ' activities';
	eventDescription.textContent = itinerary.description;
};

export const updateUI = itineraryData => {
	updateSidebar(itineraryData);

	// Update Itinerary Display
	const latestItinerary = itineraryData[Object.keys(itineraryData).slice(-1)];

	updateItineraryDisplay(latestItinerary);
};
