import { generateKey } from './generateKey';

export class Itinerary {
	constructor(title, dateStart, dateEnd, activities) {
		this.title = title;
		this.key = generateKey();
		this.dateStart = new Date(dateStart);
		this.dateEnd = new Date(dateEnd);
		this.activities = activities;
	}
	getDateString() {
		return this.date.toLocaleDateString();
	}

	getDateRangeString() {
		return (
			this.dateStart.toLocaleDateString() +
			' to ' +
			this.dateEnd.toLocaleDateString()
		);
	}

	getActivityCount() {
		return this.activities.length;
	}
}
