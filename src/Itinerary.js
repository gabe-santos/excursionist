import { generateKey } from './generateKey';

export class Itinerary {
  constructor(title, date, description) {
    this.title = title;
    this.key = generateKey();
    this.date = new Date(date);
    this.activityCount = 0;
    this.description = description;
  }
  getDateString() {
    return this.date.toLocaleDateString();
  }
}
