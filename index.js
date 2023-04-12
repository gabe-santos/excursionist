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

const newUserData = new Itinerary(
  'Create a New Itinerary',
  new Date().toLocaleDateString(),
  1,
  "Click '+ New Itinerary' to the left to get started!"
);

let itineraryListData = localStorage.getItem('itineraryListData')
  ? JSON.parse(localStorage.getItem('itineraryListData'))
  : [newUserData]; // List of all Itinerary Objects

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

const updateUI = (itineraryListData) => {
  // Update the itinerary list
  itineraryList.innerHTML = '';

  // Update Itinerary list sidebar
  itineraryListData.forEach((itinerary) => {
    const itineraryItem = document.createElement('li');
    itineraryItem.innerHTML =
      '<button class="itinerary-list-item">' + itinerary.title + '</button>';
    itineraryList.appendChild(itineraryItem);
  });

  // Update Itinerary Display
  const latestItinerary = itineraryListData[itineraryListData.length - 1];

  eventTitle.textContent = latestItinerary.title;
  eventDate.textContent = latestItinerary.date.toLocaleDateString();
  eventActivityCount.textContent =
    latestItinerary.activityCount + ' activities';
  eventDescription.textContent = latestItinerary.description;
};

document.addEventListener('createNewItinerary', () => {
  const newEntry = new Itinerary(
    formEventTitle.value,
    formEventDate.value,
    formActivityCount.value,
    formEventDescription.value
  );
  itineraryListData.push(newEntry);

  localStorage.setItem('itineraryListData', JSON.stringify(itineraryListData));

  // Update the UI to display the newly created Itinerary
  updateUI(itineraryListData);
});

const clearForm = () => {
  formEventTitle.value = '';
  formEventDate.value = '';
  formActivityCount.value = '';
  formEventDescription.value = '';
};

// Handles form submission
formModalSubmit.onclick = (e) => {
  e.preventDefault();

  createNewItinerary();
  formModal.style.display = 'none';
};

// Function calls

const init = () => {
  localStorage.setItem('user', 'gabe');
  // checks to see if localStorage is empty
  if (localStorage.getItem('itineraryListData') === null) {
    console.log('no data exists');
    return;
  }
  updateUI(storedData);
};

if (itineraryListData) updateUI(itineraryListData);
addEventListener('load', init); // run init on page load
