// Itinerary List selectors
const itineraryList = document.querySelector('#itinerary-list');
const newItineraryBtn = document.querySelector('#new-itinerary-btn');

// Itinerary Display selectors
const eventTitle = document.querySelector('#event-title');
const eventDate = document.querySelector('#event-date');

// Form data selectors
const formModal = document.querySelector('.modal');
const formModalSubmit = document.querySelector('#form-submit');
const formModalClose = document.querySelector('.close');
const formEventTitle = document.querySelector('#form-title');
const formEventDate = document.querySelector('#form-date');
const formEventDescription = document.querySelector('#form-description');

// Itinerary Object (might not use this...)
class Itinerary {
  constructor(title, date, activityCount, description) {
    this.title = title;
    this.date = date;
    this.activityCount = activityCount;
    this.description = description;
  }
}

let itineraryListData = []; // List of all Itinerary Objects

// Sample data (to be deleted)
const sampleData = {
  title: 'Lunch Date w/ Benildo',
  date: new Date().toLocaleDateString(),
  activityCount: 2,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed vehicula tempor velit, eu bibendum arcu venenatis eget. Vestibulum facilisis sed augue vel mattis. Ut euismod semper turpis, vel bibendum ipsum scelerisque eu. Etiam vel nibh euismod, semper nunc vel, scelerisque purus. Ut ac semper mauris. Phasellus ullamcorper elit id elit interdum, vel euismod purus mattis. Sed luctus sapien quis ante faucibus, ut vestibulum nisl interdum. Sed lacinia tortor vel velit commodo lacinia.',
  details: '',
};

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
window.onclick = (e) => {
  if (e.target == formModal) formModal.style.display = 'none';
};

// Loads data to be displayed in main itinerary display
const loadEventDisplay = () => {
  eventTitle.textContent = sampleData.title;
  document.querySelector('.event-date').textContent = sampleData.date;
  document.querySelector('.event-activity-count').textContent =
    sampleData.activityCount + ' activities';
  document.querySelector('.event-description').textContent =
    sampleData.description;
};

// Loads itinerary titles to be displayed on the Itinerary list display
const loadItineraryList = () => {
  itineraryListData.forEach((item) => {
    let newItem = document.createElement('li');
    newItem.textContent = item.title;
    itineraryList.append(newItem);
  });

  console.log(itineraryList);

  let newItinerary = document.createElement('li');
  newItinerary.textContent = sampleData.title;

  itineraryList.append(newItinerary);
};

// Handles form submission
formModalSubmit.onclick = () => {
  // Print data
  console.log(formEventTitle.value);
  console.log(formEventDate.value);

  let newEntry = new Itinerary(
    formEventTitle.value,
    formEventDate.value,
    formEventDescription.value
  );

  // itineraryListData.push(newEntry);

  eventTitle.textContent = newEntry.title;

  // formModal.style.display = 'none';
};

// Function calls
loadItineraryList();
loadEventDisplay();
