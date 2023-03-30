// Itinerary List selectors
const itineraryList = document.querySelector('#itinerary-list');
const newItineraryBtn = document.querySelector('#new-itinerary-btn');

// Itinerary Display selectors
const eventTitle = document.querySelector('#event-title');
const eventDate = document.querySelector('#event-date');
const eventActivityCount = document.querySelector('.event-activity-count');
const eventDescription = document.querySelector('.event-description');

// Form data selectors
const formModal = document.querySelector('.modal');
const formModalSubmit = document.querySelector('#form-submit');
const formModalClose = document.querySelector('.close');
const formEventTitle = document.querySelector('#form-title');
const formEventDate = document.querySelector('#form-date');
const formActivityCount = document.querySelector('#form-activity-count');
const formEventDescription = document.querySelector('#form-description');

// Itinerary Object
class Itinerary {
	constructor(title, date, activityCount = 0, description) {
		this.title = title;
		this.date = new Date(date);
		this.activityCount = activityCount;
		this.description = description;
	}
}

let itineraryListData = []; // List of all Itinerary Objects

// Sample data (to be deleted)
const sampleData = new Itinerary(
	'Lunch Date w/ Benildo',
	new Date().toLocaleDateString(),
	2,
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed vehicula tempor velit, eu bibendum arcu venenatis eget. Vestibulum facilisis sed augue vel mattis. Ut euismod semper turpis, vel bibendum ipsum scelerisque eu. Etiam vel nibh euismod, semper nunc vel, scelerisque purus. Ut ac semper mauris. Phasellus ullamcorper elit id elit interdum, vel euismod purus mattis. Sed luctus sapien quis ante faucibus, ut vestibulum nisl interdum. Sed lacinia tortor vel velit commodo lacinia.'
);

itineraryListData.push(sampleData);

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = () => {
	formModal.style.display = 'block';
};

// Closes form popup when close btn pressed
formModalClose.onclick = () => {
	formModal.style.display = 'none';
	// TODO: clear input when form cancelled
};

// Closes form popup when area outside of form window is pressed
window.onclick = e => {
	if (e.target == formModal) formModal.style.display = 'none';
};

// Loads data to be displayed in main itinerary display

const createNewItinerary = () => {
	const e = new CustomEvent('createNewItinerary');
	document.dispatchEvent(e);
};

function updateUI(itineraryListData) {
	// Update the itinerary list
	itineraryList.innerHTML = '';

	// Update Itinerary list sidebar
	itineraryListData.forEach(itinerary => {
		const itineraryItem = document.createElement('li');
		itineraryItem.textContent = itinerary.title;
		itineraryList.appendChild(itineraryItem);
	});

	// Update Itinerary Display
	const latestItinerary = itineraryListData[itineraryListData.length - 1];

	eventTitle.textContent = latestItinerary.title;
	eventDate.textContent = latestItinerary.date.toLocaleDateString();
	eventActivityCount.textContent =
		latestItinerary.activityCount + ' activities';
	eventDescription.textContent = latestItinerary.description;
}

document.addEventListener('createNewItinerary', () => {
	const newEntry = new Itinerary(
		formEventTitle.value,
		formEventDate.value,
		formActivityCount.value,
		formEventDescription.value
	);
	itineraryListData.push(newEntry);

	// Update the UI to display the newly created Itinerary
	updateUI(itineraryListData);
});

// Handles form submission
formModalSubmit.onclick = e => {
	e.preventDefault();

	createNewItinerary();
	formModal.style.display = 'none';
};

// Function calls
updateUI(itineraryListData);
