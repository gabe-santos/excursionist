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
import { Itinerary } from './src/Itinerary'; // Itinerary Object
import { calendarControl } from './src/calendar';
import { itineraryList, addNewItinerary } from './src/itineraryList';
//import sqlite3 from 'sqlite3';

//const db = new sqlite3.Database('./db/data.db');

//const sqlite3 = require("sqlite3").verbose();

// Form Modal Code
// Displays popup form when '+ New Itinerary' clicked
newItineraryBtn.onclick = openFormModal;
// Closes form popup when close btn pressed
formModalClose.onclick = closeFormModal;

// Closes form popup when area outside of form window is pressed
window.onclick = (e) => {
  if (e.target == formModal) closeFormModal();
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get values of input fields
  const title = formEventTitle.value;
  const dateStart = formEventDateStart.value;
  const dateEnd = formEventDateEnd.value;
  const description = formEventDescription.value;

  // Check if required inputs are filled
  if (
    title.trim() === '' ||
    dateStart.trim() === '' ||
    dateEnd.trim() === '' ||
    description.trim() === ''
  ) {
    alert('Please fill all required fields.');
    return;
  }

  // Call the function to add new itinerary
  addNewItinerary(title, dateStart, dateEnd, description);
});

// formModalSubmit.onclick = e => {
// 	e.preventDefault();
// 	addNewItinerary(
// 		formEventTitle.value,
// 		formEventDateStart.value,
// 		formEventDateEnd.value,
// 		formEventDescription.value
// 	);
// };

const init = () => {
  addNewItinerary(
    'Create a New Itinerary',
    new Date(),
    new Date(),
    "Click '+ New Itinerary' to the left to get started!"
  );

  const tempItinerary = new Itinerary(
    'Test Itinerary',
    new Date(),
    new Date(),
    ['test', 'test2']
  );

  //db.run(
  //"INSERT INTO itineraries (title, date_start, date_end, activities) VALUES (?, ?, ?, ?)",
  //[
  //tempItinerary.title,
  //tempItinerary.dateStart,
  //tempItinerary.dateEnd,
  //JSON.stringify(tempItinerary.activities),
  //],
  //function (err) {
  //if (err) {
  //console.log(err.message);
  //} else {
  //console.log(`Inserted itinerary with ID ${this.lastID}`);
  //}
  //}
  //);

  updateUI(itineraryList);
};

addEventListener('load', init); // run init on page load
