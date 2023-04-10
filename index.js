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

let itineraryListData = JSON.parse(localStorage.getItem('itineraryListData')); // List of all Itinerary Objects

// Sample data (to be deleted)
//const sampleData = new Itinerary(
//'Lunch Date w/ Benildo',
//new Date().toLocaleDateString(),
//2,
//'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed vehicula tempor velit, eu bibendum arcu venenatis eget. Vestibulum facilisis sed augue vel mattis. Ut euismod semper turpis, vel bibendum ipsum scelerisque eu. Etiam vel nibh euismod, semper nunc vel, scelerisque purus. Ut ac semper mauris. Phasellus ullamcorper elit id elit interdum, vel euismod purus mattis. Sed luctus sapien quis ante faucibus, ut vestibulum nisl interdum. Sed lacinia tortor vel velit commodo lacinia.'
//);

//itineraryListData.push(sampleData);

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
updateUI(itineraryListData);

const init = () => {
  updateUI(storedData);
};

addEventListener('load', init); // run init on page load
