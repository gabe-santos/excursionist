const itineraryList = document.querySelector('#itinerary-list');
const formModal = document.querySelector('.modal');
const newItineraryBtn = document.querySelector('#new-itinerary-btn');
const formModalClose = document.querySelector('.close');
const formModalSubmit = document.querySelector('#form-submit');

// Form data selectors
const eventTitle = document.querySelector('#form-title');
const eventDate = document.querySelector('#form-date');
const eventDescription = document.querySelector('#form-description');

let itineraryListData = [];

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

// function createNewItinerary() {
//   console.log('working...');
// }

formModalSubmit.onclick = () => {
  formModal.style.display = 'none';

  // Get data from form
  console.log(eventTitle.value);
};

loadItineraryList();
loadEventDisplay();
