import { generateKey } from './generateKey';

export class Itinerary {
	constructor(title, id, dateStart, dateEnd, activities) {
		this.title = title;
		this.key = id;
		this.dateStart = new Date(dateStart);
		this.dateEnd = new Date(dateEnd);
		this.activities = activities;

		if (
			Array.isArray(activities) &&
			activities.every(item => typeof item === 'string')
		) {
			this.activities = activities;
		} else {
			throw new Error('Activities must be an array of strings.');
		}
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
