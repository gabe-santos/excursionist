import { itineraryList, newItineraryBtn } from './src/itineraryListSelectors'; // Itinerary List selectors
import {
  eventTitle,
  eventDate,
  eventActivityCount,
  eventDescription,
} from './src/itineraryDisplaySelectors'; // Itinerary Display selectors
import {
  formModal,
  formModalClose,
  formModalSubmit,
  formEventTitle,
  formEventDate,
  formActivityCount,
  formEventDescription,
} from './src/formDataSelectors';
import { Itinerary } from './src/Itinerary'; // Itinerary Object
import { calendarControl } from './src/calendar';

const itineraryData = {};

const newUserData = new Itinerary(
  'Create a New Itinerary',
  new Date(),
  "Click '+ New Itinerary' to the left to get started!"
);
itineraryData[newUserData.key] = newUserData;

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = () => {
  formModal.style.display = 'block';
};

const closeModal = () => {
  clearForm();
  formModal.style.display = 'none';
};

// Closes form popup when close btn pressed
formModalClose.onclick = closeModal;

// Closes form popup when area outside of form window is pressed
window.onclick = (e) => {
  if (e.target == formModal) closeModal();
};

// Loads data to be displayed in main itinerary display
const createNewItinerary = () => {
  const e = new CustomEvent('createNewItinerary');
  document.dispatchEvent(e);
};

const switchItineraryDisplay = (e) => {
  console.log(e.target.id);
  updateItineraryDisplay(itineraryData[e.target.id]);
};

const updateSidebar = (data) => {
  itineraryList.innerHTML = '';
  for (const key in data) {
    const it = data[key];
    const itineraryLi = document.createElement('li');
    itineraryLi.innerHTML = `<button class="itinerary-list-item" id="${key}">${it.title}</button>`;
    itineraryLi.addEventListener('click', switchItineraryDisplay);
    itineraryList.appendChild(itineraryLi);
  }
};

const updateItineraryDisplay = (itinerary) => {
  eventTitle.textContent = itinerary.title;
  eventDate.textContent = itinerary.date
    ? itinerary.getDateString()
    : 'No Date';
  eventActivityCount.textContent = itinerary.activityCount + ' activities';
  eventDescription.textContent = itinerary.description;
};

const updateUI = (itineraryData) => {
  updateSidebar(itineraryData);

  console.log(itineraryData);

  // Update Itinerary Display
  const keys = Object.keys(itineraryData);
  const latestItineraryKey = keys[keys.length - 1];
  const latestItinerary = itineraryData[latestItineraryKey];

  updateItineraryDisplay(latestItinerary);
};

document.addEventListener('createNewItinerary', () => {
  const newEntry = new Itinerary(
    formEventTitle.value,
    formEventDate.value,
    formEventDescription.value
  );
  itineraryData[newEntry.key] = newEntry;

  // Update the UI to display the newly created Itinerary
  updateUI(itineraryData);
});

const clearForm = () => {
  formEventTitle.value = '';
  formEventDate.value = '';
  formEventDescription.value = '';
};

// Handles form submission
formModalSubmit.onclick = (e) => {
  e.preventDefault();
  createNewItinerary();
  formModal.style.display = 'none';
};
// Function calls

const init = () => {};

addEventListener('load', init); // run init on page load
updateUI(itineraryData);
