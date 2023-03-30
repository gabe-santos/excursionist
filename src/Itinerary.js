export class Itinerary {
	constructor(title, date, activityCount = 0, description) {
		this.title = title;
		this.date = new Date(date);
		this.activityCount = activityCount;
		this.description = description;
	}
}
