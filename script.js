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

// Itinerary Object
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
  description: 'getting korean bbq, playing overwatch 2',
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
  document.querySelector('.event-date').textContent =
    'Date: ' + sampleData.date;
  document.querySelector('.event-activity-count').textContent =
    'Activities: ' + sampleData.activityCount;
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
