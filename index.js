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
import { itineraryList, addNewItinerary } from './src/itineraryList';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { autofill } from '@mapbox/search-js-web';

const mapbox_accessToken =
	'pk.eyJ1IjoiZ3NhbnRvczI4IiwiYSI6ImNsaGoydmU2ZTBkb2QzZGxnZWVlbTc0OGwifQ.x78syQk1RUYpa0DtFj4kRA';

mapboxgl.accessToken =
	'pk.eyJ1IjoiZ3NhbnRvczI4IiwiYSI6ImNsaGoydmU2ZTBkb2QzZGxnZWVlbTc0OGwifQ.x78syQk1RUYpa0DtFj4kRA';

// const map = new mapboxgl.Map({
// 	container: 'map', // container ID
// 	style: 'mapbox://styles/mapbox/streets-v12', // style URL
// 	center: [-117.1596737, 33.1278778], // starting position [lng, lat]
// 	zoom: 15, // starting zoom
// });

const searchInput = document.getElementById('location-search');
const searchSuggestions = document.getElementById('search-suggestions');
let searchResults = [];

searchInput.addEventListener('input', function (event) {
	const searchQuery = event.target.value;
	const geocodingEndpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		searchQuery
	)}.json?access_token=${mapbox_accessToken}&autocomplete=true&limit=5`;

	fetch(geocodingEndpoint)
		.then(response => response.json())
		.then(data => {
			searchResults = data.features;
			displaySearchSuggestions();
		});
});

function displaySearchSuggestions() {
	if (searchResults.length === 0) {
		searchSuggestions.style.display = 'none';
		return;
	}

	searchSuggestions.innerHTML = '';

	searchResults.forEach(result => {
		const suggestion = document.createElement('div');
		suggestion.classList.add('search-suggestion');
		suggestion.innerHTML = result.place_name;
		suggestion.addEventListener('click', function () {
			const coordinates = result.center;
			console.log(coordinates);
			searchInput.innerHTML = result;
			map.flyTo({ center: coordinates });
		});
		searchSuggestions.appendChild(suggestion);
	});

	searchSuggestions.style.display = 'block';
}

const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-122.4194, 37.7749],
	zoom: 15,
});

const marker = new mapboxgl.Marker().setLngLat([-122.4194, 37.7749]).addTo(map);

searchInput.addEventListener('focus', function () {
	displaySearchSuggestions();
});

searchInput.addEventListener('blur', function () {
	setTimeout(() => {
		searchSuggestions.style.display = 'none';
	}, 100);
});

document.addEventListener('click', function (event) {
	if (
		!searchInput.contains(event.target) &&
		!searchSuggestions.contains(event.target)
	) {
		searchSuggestions.style.display = 'none';
	}
});

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
	fetch('http://localhost:3001/data')
		.then(response => response.json())
		.then(data => {
			console.log(data); // Process the received data
			data.forEach(item => {
				addNewItinerary(
					item.title,
					item.id,
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

	// const today = new Date();
	// const twoDaysFromToday = new Date(today);
	// twoDaysFromToday.setDate(today.getDate() + 2);
};

addEventListener('load', init); // run init on page load
