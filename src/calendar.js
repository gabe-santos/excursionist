const daysTag = document.querySelector('.days'),
	currentDate = document.querySelector('.current-date'),
	prevNextIcon = document.querySelectorAll('.icons span');

// getting new date, current year and month
let date = new Date(),
	currYear = date.getFullYear(),
	currMonth = date.getMonth();

// storing full name of all months in array
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const renderCalendar = (year, month) => {
	const firstDayofMonth = new Date(year, month, 1).getDay();
	const lastDateofMonth = new Date(year, month + 1, 0).getDate();
	const lastDayofMonth = new Date(year, month, lastDateofMonth).getDay();
	const lastDateofLastMonth = new Date(year, month, 0).getDate();

	let liTag = '';

	for (let i = firstDayofMonth; i > 0; i--) {
		liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
	}

	for (let i = 1; i <= lastDateofMonth; i++) {
		let isToday =
			i === date.getDate() &&
			month === new Date().getMonth() &&
			year === new Date().getFullYear()
				? 'today'
				: '';
		liTag += `<li class="${isToday}">${i}</li>`;
	}

	for (let i = lastDayofMonth; i < 6; i++) {
		liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
	}

	currentDate.innerText = `${months[month]} ${year}`;
	daysTag.innerHTML = liTag;
};
renderCalendar(currYear, currMonth);

prevNextIcon.forEach(icon => {
	icon.addEventListener('click', () => {
		currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

		if (currMonth < 0 || currMonth > 11) {
			date = new Date(currYear, currMonth, new Date().getDate());
			currYear = date.getFullYear();
			currMonth = date.getMonth();
		} else {
			date = new Date();
		}
		renderCalendar(currYear, currMonth);
	});
});

export const highlightDateRange = dateRangeToHighlight => {
	const [startStr, endStr] = dateRangeToHighlight.split(' to ');
	const startDate = new Date(startStr);
	const endDate = new Date(endStr);

	const allDates = document.querySelectorAll('.days li');
	allDates.forEach(date => {
		date.classList.remove('highlight', 'light-highlight'); // remove both classes
		if (date.innerText !== '' && !date.classList.contains('inactive')) {
			const currDate = new Date(currYear, currMonth, date.innerText);
			if (
				currDate.getTime() === startDate.getTime() ||
				currDate.getTime() === endDate.getTime()
			) {
				date.classList.add('highlight');
			} else if (currDate > startDate && currDate < endDate) {
				date.classList.add('light-highlight');
			}
		}
	});
};
