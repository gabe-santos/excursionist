import { generateKey } from './generateKey';

export class Itinerary {
	constructor(title, dateStart, dateEnd, description) {
		this.title = title;
		this.key = generateKey();
		this.dateStart = new Date(dateStart);
		this.dateEnd = new Date(dateEnd);
		this.activityCount = 0;
		this.description = description;
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
}
