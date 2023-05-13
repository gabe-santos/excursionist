import {
	itineraryUl,
	eventTitle,
	eventDate,
	eventDescription,
} from './selectors';
import { itineraryList } from './itineraryList';
import { highlightDateRange } from './calendar';
import mapboxgl, { LngLat } from 'mapbox-gl';
import { trash } from './assets/Trash';

const switchItineraryDisplay = e => {
	updateItineraryDisplay(itineraryList[e.target.id]);
};

const updateSidebar = data => {
	itineraryUl.innerHTML = '';
	for (const key in data) {
		const it = data[key];
		const itineraryLi = document.createElement('li');
		itineraryLi.innerHTML = `
      <div class="itinerary-item-container">
        <div class="itinerary-list-btns">
          <button class="itinerary-list-item" id="${key}">${it.title}</button>

          <button class="delete-btn">${trash}</button>
        </div>
      </div>`;
		const itineraryBtn = itineraryLi.querySelector('.itinerary-list-item');
		itineraryBtn.addEventListener('click', switchItineraryDisplay);

		const deleteBtn = itineraryLi.querySelector('.delete-btn');
		deleteBtn.addEventListener('click', deleteItinerary);

		itineraryUl.appendChild(itineraryLi);
	}
};

const deleteItinerary = e => {
	// Find the parent element that contains both buttons
	const parent = e.target.closest('.itinerary-list-btns');

	// Find the itinerary button within the parent element
	const itineraryBtn = parent.querySelector('.itinerary-list-item');

	// Extract the ID of the itinerary from the button ID
	const id = itineraryBtn.id;
	console.log(typeof id);

	console.log(`Deleting itinerary with ID ${id}`);

	fetch(`http://localhost:3001/data/${id}`, {
		method: 'DELETE',
	})
		.then(res => {
			if (res.ok) console.log('Itinerary delete successfully');
			else if (response.status === 404) {
				console.log('Itinerary not found');
			} else {
				console.error(
					'Failed to delete itinerary:',
					response.statusText
				);
			}
		})
		.catch(error => {
			console.error('Error deleting itinerary:', error);
		});

	location.reload();
};

const updateMap = location => {
	let coordinates;
	if (location) {
		coordinates = mapboxgl.LngLat.convert(JSON.parse(location));
	} else {
		coordinates = new LngLat(-117.1596737, 33.1278778);
	}

	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: coordinates,
		zoom: 15,
	});

	const marker = new mapboxgl.Marker({ color: 'hsl(176, 44%, 45%)' })
		.setLngLat(coordinates)
		.addTo(map);
};

const updateItineraryDisplay = itinerary => {
	eventTitle.textContent = itinerary.title;
	console.log(itinerary.getDateRangeString());
	console.log(itinerary.dateStart, itinerary.dateEnd);

	if (
		itinerary.dateStart &&
		itinerary.dateStart.getTime() === itinerary.dateEnd.getTime()
	) {
		eventDate.textContent =
			'🗓️ ' + itinerary.dateStart.toLocaleDateString();
	} else {
		eventDate.textContent =
			itinerary.dateStart != 'Invalid Date'
				? '🗓️ ' + itinerary.getDateRangeString()
				: '';
	}

	eventDescription.innerHTML = itinerary.activities
		? itinerary.activities
				.map(
					activity =>
						`<li class="itinerary-display-item">${activity}</li>`
				)
				.join('')
		: '';

	updateMap(itinerary.location);
	console.log(itinerary.getDateRangeString());
	highlightDateRange(itinerary.getDateRangeString());
};

export const updateUI = itineraryData => {
	console.log(itineraryData);
	updateSidebar(itineraryData);

	// Update Itinerary Display
	const latestItinerary = itineraryData[Object.keys(itineraryData).slice(-1)];

	updateItineraryDisplay(latestItinerary);
};
