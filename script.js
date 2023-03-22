const itineraryList = document.querySelector('.itinerary-list');
let itineraryListData = [];

const sampleData = {
	title: 'Lunch Date w/ Benildo',
	date: new Date(),
	activityCount: 2,
	description: 'getting korean bbq, playing overwatch 2',
	details: '',
};

itineraryListData.push(sampleData);

function loadEventDisplay() {
	document.querySelector('.event-title').textContent = sampleData.title;
}

function loadItineraryList() {
	itineraryListData.forEach(item => {
		itineraryList.appendChild('<li>' + item.title + '</li>');
	});
}

loadItineraryList();
loadEventDisplay();
