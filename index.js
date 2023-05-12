import { newItineraryBtn, formModal, formModalClose } from './src/selectors';
import { openFormModal, closeFormModal } from './src/formModal';
import { updateUI } from './src/uiUpdates';
import { itineraryList, addNewItinerary } from './src/itineraryList';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

const mapbox_accessToken =
	'pk.eyJ1IjoiZ3NhbnRvczI4IiwiYSI6ImNsaGoydmU2ZTBkb2QzZGxnZWVlbTc0OGwifQ.x78syQk1RUYpa0DtFj4kRA';

mapboxgl.accessToken =
	'pk.eyJ1IjoiZ3NhbnRvczI4IiwiYSI6ImNsaGoydmU2ZTBkb2QzZGxnZWVlbTc0OGwifQ.x78syQk1RUYpa0DtFj4kRA';

const locationSearch = document.getElementById('location-search');
const searchSuggestions = document.getElementById('search-suggestions');
let searchResults = [];

locationSearch.addEventListener('input', function (event) {
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
		suggestion.addEventListener('click', () => {
			const coordinates = result.center;
			console.log(coordinates, typeof coordinates);
			locationSearch.value = JSON.stringify(coordinates);
			console.log(
				JSON.stringify(coordinates),
				typeof JSON.stringify(coordinates)
			);
			searchSuggestions.style.display = 'none';
		});
		searchSuggestions.appendChild(suggestion);
	});

	searchSuggestions.style.display = 'block';
}

locationSearch.addEventListener('focus', function () {
	displaySearchSuggestions();
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
					JSON.parse(item.activities),
					item.coordinates
				);
			});
			updateUI(itineraryList);
		})
		.catch(error => {
			console.error('Error:', error); // Handle any error that occurred
		});
};

addEventListener('load', init); // run init on page load
