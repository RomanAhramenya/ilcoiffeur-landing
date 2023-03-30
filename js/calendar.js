// const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];
// const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// let timeslots = [];

// // month "01.2020"
// async function getTimeslots(month) {
//   try {
//     const response = await fetch(
//       "http://localhost:3000/events/timeslots?month=" + month,
//       { mode: "no-cors" }
//     );

//     console.log(response);
//     timeslots = await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// }

// // date "2023-03-11"
// function getTimeslotsForDate(timeslots, date) {
//   const timeslotsForDate = timeslots[date].map((slot) => {
//     const start = new Date(slot.start);
//     const hours = start.getHours().toString().padStart(2, "0");
//     const minutes = start.getMinutes().toString().padStart(2, "0");
//     return `${hours}:${minutes}`;
//   });

//   return timeslotsForDate;
// }

// function formatDateAndTime(dateString, timeString) {
//   const [hours, minutes] = timeString.split(":");
//   const date = new Date(`${dateString}T${hours}:${minutes}:00.000Z`);
//   return date;
// }

// // monthYearString = 03.2023
// function getMonthInfo(monthYearString) {
//   const [monthString, yearString] = monthYearString.split(".");
//   const monthIndex = Number(monthString) - 1;
//   const year = Number(yearString);
//   const firstDayOfMonth = new Date(year, monthIndex, 1);
//   const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
//   const daysInMonth = lastDayOfMonth.getDate();
//   const firstWeekdayOfMonth = firstDayOfMonth.getDay() || 7;

//   return {
//     daysInMonth,
//     firstWeekdayOfMonth,
//   };
// }

// export async function generateCalendar(
//   calendarWrapperElement,
//   timeslotsWrapperElement
// ) {
//   const today = new Date();
//   const currentMonth = today.getMonth();
//   const currentYear = today.getFullYear();
//   const monthYearStrings = [
//     `${currentMonth}.${currentYear}`,
//     `${(currentMonth + 1) % 12}.${currentYear + (currentMonth === 11 ? 1 : 0)}`,
//   ];

//   const monthInfo = monthYearStrings.map(getMonthInfo);

//   const monthElement = createMonthElement(monthInfo);
//   const daysElement = createDaysElement();
//   const datesElement = createDatesElement(monthInfo);

//   calendarWrapperElement.appendChild(monthElement);
//   calendarWrapperElement.appendChild(daysElement);
//   calendarWrapperElement.appendChild(datesElement);

//   // Generate Timeslots
//   const month = String(today.getMonth() + 1).padStart(2, "0");
//   const day = String(today.getDate()).padStart(2, "0");
//   const todayString = `${currentYear}-${month}-${day}`;

//   await getTimeslots(currentMonth + "." + currentYear);
//   generateTimeslots(timeslotsWrapperElement, todayString);
// }

// function createMonthElement(monthInfo) {
//   const monthElement = document.createElement("div");
//   monthElement.classList.add("month");
//   const monthListElement = document.createElement("ul");
//   monthElement.appendChild(monthListElement);

//   for (let i = 0; i < 2; i++) {
//     const monthListItemElement = document.createElement("li");
//     if (i === 0) {
//       monthListItemElement.classList.add("month-current");
//       const currentMonthName = monthNames[Number(monthInfo[i].month) - 1];
//       monthListItemElement.textContent = currentMonthName;
//     } else {
//       const nextMonthName = monthNames[Number(monthInfo[i].month) - 1];
//       monthListItemElement.textContent = nextMonthName;
//     }
//     monthListElement.appendChild(monthListItemElement);
//   }

//   return monthElement;
// }

// function createDaysElement() {
//   const daysElement = document.createElement("div");
//   daysElement.classList.add("days");
//   const daysListElement = document.createElement("ul");
//   daysElement.appendChild(daysListElement);

//   for (let j = 0; j < 7; j++) {
//     const dayName = dayNames[j];
//     const dayListItemElement = document.createElement("li");
//     dayListItemElement.textContent = dayName;
//     daysListElement.appendChild(dayListItemElement);
//   }

//   return daysElement;
// }

// function createDatesElement(monthInfo) {
//   const datesElement = document.createElement("div");
//   datesElement.classList.add("dates");

//   const startDate = monthInfo[0].firstWeekdayOfMonth;
//   const numDays = monthInfo[0].daysInMonth;

//   // Get the current date
//   const currentDate = new Date();

//   // Add empty dates to pad the beginning of the month
//   for (let i = 0; i < startDate; i++) {
//     const dateButtonElement = document.createElement("button");
//     dateButtonElement.classList.add("date", "date-empty");
//     const dateTextElement = document.createElement("time");
//     dateButtonElement.appendChild(dateTextElement);
//     datesElement.appendChild(dateButtonElement);
//   }

//   // Add date buttons for each day in the month
//   for (let j = 1; j <= numDays; j++) {
//     const dateButtonElement = document.createElement("button");
//     dateButtonElement.classList.add("date");

//     const date = new Date(
//       Number(monthInfo[0].year),
//       Number(monthInfo[0].month) - 1,
//       j
//     );

//     // Add appropriate classes based on the date
//     if (date < currentDate) {
//       dateButtonElement.classList.add("date-before");
//     } else if (date.getTime() === currentDate.getTime()) {
//       dateButtonElement.classList.add("date-today", "date-active");
//     }

//     const dateTextElement = document.createElement("time");
//     dateTextElement.textContent = j.toString();
//     dateButtonElement.appendChild(dateTextElement);
//     datesElement.appendChild(dateButtonElement);
//   }

//   // Add empty dates to pad the end of the month
//   for (let k = 0; k < (35 - startDate - numDays) % 7; k++) {
//     const dateButtonElement = document.createElement("button");
//     dateButtonElement.classList.add("date", "date-empty");
//     const dateTextElement = document.createElement("time");
//     dateButtonElement.appendChild(dateTextElement);
//     datesElement.appendChild(dateButtonElement);
//   }

//   return datesElement;
// }

// function generateTimeslots(timeslotsWrapperElement, dateString) {
//   timeslots = getTimeslotsForDate(timeslots, dateString);
//   const header = document.createElement("h4");
//   header.textContent = "Timeslots";
//   timeslotsWrapperElement.appendChild(header);

//   timeslots.array.forEach((timeslot) => {
//     const timeslotButton = document.createElement("button");
//     timeslotButton.classList.add("time");
//     const timeslotElement = document.createElement("time");
//     timeslotElement.textContent = timeslot;
//     timeslotButton.appendChild(timeslotElement);
//     timeslotsWrapperElement.appendChild(timeslotButton);
//   });
// }
