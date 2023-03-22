const itineraryList = document.querySelector('#itinerary-list');
let itineraryListData = [];

const sampleData = {
	title: 'Lunch Date w/ Benildo',
	date: new Date().toLocaleDateString(),
	activityCount: 2,
	description: 'getting korean bbq, playing overwatch 2',
	details: '',
};

itineraryListData.push(sampleData);

function loadEventDisplay() {
	document.querySelector('.event-title').textContent = sampleData.title;
	document.querySelector('.event-date').textContent =
		'Date: ' + sampleData.date;
	document.querySelector('.event-activity-count').textContent =
		'Activities: ' + sampleData.activityCount;
}

function loadItineraryList() {
	// itineraryListData.forEach(item => {
	// 	itineraryList.appendChild('<li>' + item.title + '</li>');
	// });

	console.log(itineraryList);

	let newItinerary = document.createElement('li');
	newItinerary.textContent = sampleData.title;

	itineraryList.append(newItinerary);
}

loadItineraryList();
loadEventDisplay();
