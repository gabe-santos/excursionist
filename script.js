// Component selectors
const itineraryList = document.querySelector('#itinerary-list');
const formModal = document.querySelector('.modal');
const newItineraryBtn = document.querySelector('#new-itinerary-btn');
const formModalClose = document.querySelector('.close');
const formModalSubmit = document.querySelector('#form-submit');
const eventTitle = document.querySelector('#event-title');
const eventDate = document.querySelector('#event-date');

// Form data selectors
const formEventTitle = document.querySelector('#form-title');
const formEventDate = document.querySelector('#form-date');
const formEventDescription = document.querySelector('#form-description');

class Itinerary {
  constructor(title, date, activityCount, description) {
    this.title = title;
    this.date = date;
    this.activityCount = activityCount;
    this.description = description;
  }
}

let itineraryListData = []; // List of all Itinerary Objects

const sampleData = {
  title: 'Lunch Date w/ Benildo',
  date: new Date().toLocaleDateString(),
  activityCount: 2,
  description: 'getting korean bbq, playing overwatch 2',
  details: '',
};

itineraryListData.push(sampleData);

// Form Modal Code
newItineraryBtn.onclick = () => {
  formModal.style.display = 'block';
};

formModalClose.onclick = () => {
  formModal.style.display = 'none';
  // TODO: clear input when form cancelled
};

window.onclick = (e) => {
  if (e.target == formModal) formModal.style.display = 'none';
};

const loadEventDisplay = () => {
  eventTitle.textContent = sampleData.title;
  document.querySelector('.event-date').textContent =
    'Date: ' + sampleData.date;
  document.querySelector('.event-activity-count').textContent =
    'Activities: ' + sampleData.activityCount;
};

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

formModalSubmit.onclick = () => {
  // Get data from form
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

loadItineraryList();
loadEventDisplay();
