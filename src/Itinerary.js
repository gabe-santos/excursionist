export class Itinerary {
	constructor(title, id, dateStart, dateEnd, activities, location) {
		this.title = title;
		this.id = id;
		this.dateStart = new Date(dateStart);
		this.dateEnd = new Date(dateEnd);
		this.activities = activities;
		this.location = location;

		// Handle weird day error
		this.dateStart.setDate(this.dateStart.getDate() + 1);
		this.dateEnd.setDate(this.dateEnd.getDate() + 1);

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
		console.log(this.dateStart.toLocaleDateString());
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
