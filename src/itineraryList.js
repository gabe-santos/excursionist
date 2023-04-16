import {
  formEventTitle,
  formEventDateStart,
  formEventDateEnd,
  formEventDescription,
} from "./selectors";
import { Itinerary } from "./Itinerary";
import { updateUI } from "./uiUpdates";
import { closeFormModal } from "./formModal";

export const itineraryList = {};

export const addNewItinerary = (title, dateStart, dateEnd, desc) => {
  console.log(desc);
  const activities = desc.split(/[\n-]+/); // Split the description into an array of activities

  const newEntry = new Itinerary(title, dateStart, dateEnd, activities);

  itineraryList[newEntry.key] = newEntry;

  // Update the UI to display the newly created Itinerary
  updateUI(itineraryList);

  closeFormModal();
};
