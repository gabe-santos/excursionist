import { leftArrow } from "./assets/LeftArrow";
import { rightArrow } from "./assets/RightArrow";

function CalendarControl() {
  const calendar = new Date();
  const calendarControl = {
    localDate: new Date(),
    prevMonthLastDate: null,
    calWeekDays: ["S", "M", "T", "W", "T", "F", "S"],
    calMonthName: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    daysInMonth: (m, y) => new Date(y, m, 0).getDate(),

    firstDay: () => new Date(calendar.getFullYear(), calendar.getMonth(), 1),

    lastDay: () => new Date(calendar.getFullYear(), calendar.getMonth() + 1, 0),

    firstDayNumber: () => calendarControl.firstDay().getDay() + 1,

    lastDayNumber: () => calendarControl.lastDay().getDay() + 1,

    getPreviousMonthLastDate: () => {
      const lastDate = new Date(
        calendar.getFullYear(),
        calendar.getMonth(),
        0
      ).getDate();
      return lastDate;
    },
    navigateToPreviousMonth: () => {
      calendar.setMonth(calendar.getMonth() - 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToNextMonth: () => {
      calendar.setMonth(calendar.getMonth() + 1);
      calendarControl.attachEventsOnNextPrev();
    },
    navigateToCurrentMonth: () => {
      const currentMonth = calendarControl.localDate.getMonth();
      const currentYear = calendarControl.localDate.getFullYear();
      calendar.setMonth(currentMonth);
      calendar.setYear(currentYear);
      calendarControl.attachEventsOnNextPrev();
    },
    displayYear: () => {
      const yearLabel = document.querySelector(
        ".calendar .calendar-year-label"
      );
      yearLabel.innerHTML = calendar.getFullYear();
    },
    displayMonth: () => {
      const monthLabel = document.querySelector(
        ".calendar .calendar-month-label"
      );
      monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
    },
    selectDate: (e) => {
      console.log(
        `${e.target.textContent} ${
          calendarControl.calMonthName[calendar.getMonth()]
        } ${calendar.getFullYear()}`
      );
    },
    plotSelectors: () => {
      const calendarControls = `
    <div class="calendar-controls">
      <div class="calendar-prev"><a href="#">${leftArrow}</a></div>
      <div class="calendar-year-month">
        <div class="calendar-month-label"></div>
        <div>-</div>
        <div class="calendar-year-label"></div>
      </div>
      <div class="calendar-next"><a href="#">${rightArrow}</a></div>
    </div>
  `;

      const todayDate = `
    <div class="calendar-today-date">Today:
      ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]},
      ${calendarControl.localDate.getDate()},
      ${calendarControl.calMonthName[calendarControl.localDate.getMonth()]}
      ${calendarControl.localDate.getFullYear()}
    </div>
  `;

      const calendarBody = `<div class="calendar-body"></div>`;

      const calendarInner = `
    <div class="calendar-inner">
      ${calendarControls}
      ${todayDate}
      ${calendarBody}
    </div>
  `;

      document.querySelector(".calendar").innerHTML += calendarInner;
    },

    plotDayNames: () => {
      const dayNamesHtml = calendarControl.calWeekDays
        .map((day) => `<div>${day}</div>`)
        .join("");
      document.querySelector(".calendar .calendar-body").innerHTML +=
        dayNamesHtml;
    },

    plotDates: () => {
      document.querySelector(".calendar .calendar-body").innerHTML = "";
      calendarControl.plotDayNames();
      calendarControl.displayMonth();
      calendarControl.displayYear();
      let count = 1;
      let prevDateCount = 0;

      calendarControl.prevMonthLastDate =
        calendarControl.getPreviousMonthLastDate();
      let prevMonthDatesArray = [];
      let calendarDays = calendarControl.daysInMonth(
        calendar.getMonth() + 1,
        calendar.getFullYear()
      );
      // dates of current month
      for (let i = 1; i < calendarDays; i++) {
        if (i < calendarControl.firstDayNumber()) {
          prevDateCount += 1;
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="prev-dates"></div>`;
          prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
        } else {
          document.querySelector(
            ".calendar .calendar-body"
          ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
        }
      }
      //remaining dates after month dates
      for (let j = 0; j < prevDateCount + 1; j++) {
        document.querySelector(
          ".calendar .calendar-body"
        ).innerHTML += `<div class="number-item" data-num=${count}><a class="dateNumber" href="#">${count++}</a></div>`;
      }
      calendarControl.highlightToday();
      calendarControl.plotPrevMonthDates(prevMonthDatesArray);
      calendarControl.plotNextMonthDates();
    },
    attachEvents: () => {
      let prevBtn = document.querySelector(".calendar .calendar-prev a");
      let nextBtn = document.querySelector(".calendar .calendar-next a");
      let todayDate = document.querySelector(".calendar .calendar-today-date");
      let dateNumber = document.querySelectorAll(".calendar .dateNumber");
      prevBtn.addEventListener(
        "click",
        calendarControl.navigateToPreviousMonth
      );
      nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
      todayDate.addEventListener(
        "click",
        calendarControl.navigateToCurrentMonth
      );
      for (var i = 0; i < dateNumber.length; i++) {
        dateNumber[i].addEventListener(
          "click",
          calendarControl.selectDate,
          false
        );
      }
    },
    highlightToday: () => {
      let currentMonth = calendarControl.localDate.getMonth() + 1;
      let changedMonth = calendar.getMonth() + 1;
      let currentYear = calendarControl.localDate.getFullYear();
      let changedYear = calendar.getFullYear();
      if (
        currentYear === changedYear &&
        currentMonth === changedMonth &&
        document.querySelectorAll(".number-item")
      ) {
        document
          .querySelectorAll(".number-item")
          [calendar.getDate() - 1].classList.add("calendar-today");
      }
    },
    plotPrevMonthDates: (dates) => {
      dates.reverse();
      for (let i = 0; i < dates.length; i++) {
        if (document.querySelectorAll(".prev-dates")) {
          document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
        }
      }
    },
    plotNextMonthDates: () => {
      const childElemCount =
        document.querySelector(".calendar-body").childElementCount;
      //7 lines
      if (childElemCount > 42) {
        const diff = 49 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }

      //6 lines
      if (childElemCount > 35 && childElemCount <= 42) {
        const diff = 42 - childElemCount;
        calendarControl.loopThroughNextDays(diff);
      }
    },
    loopThroughNextDays: (count) => {
      if (count > 0) {
        for (let i = 1; i <= count; i++) {
          document.querySelector(
            ".calendar-body"
          ).innerHTML += `<div class="next-dates">${i}</div>`;
        }
      }
    },
    attachEventsOnNextPrev: () => {
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
    init: () => {
      calendarControl.plotSelectors();
      calendarControl.plotDates();
      calendarControl.attachEvents();
    },
  };
  calendarControl.init();
}

export const calendarControl = new CalendarControl();
