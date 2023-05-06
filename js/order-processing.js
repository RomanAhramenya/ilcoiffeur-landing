import { useState } from "./hooks.js";
import servicesData from "./services-and-timings.js";

const arrows = document.getElementsByClassName("arrow-container");

const [department, setDepartment] = useState("");
const [seviceType, setSeviceType] = useState("");

//запрещаем скролл при открытом модальном окне

function toggleScrollBody(status) {
  let body = document.body;
  if (status) {
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = "";
  }
}
//пробегаемся по всем кнопкам arrow
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", function () {
    setDepartment(getDepartmentText(this));
    setSeviceType(getServiceTypeText(this));
    toggleScrollBody(true);
    console.log(department());
    console.log(seviceType());
    let imageSrc = this.parentElement.querySelector("img").src;
    updateOrderProcessingContentFirstScreen(
      imageSrc,
      servicesData[department()][seviceType()],
      seviceType()
    );
  });
}

// forMen || forWomen || forChildren
function getDepartmentText(element) {
  //поднимаемся в верх по дереву
  let item = element.parentElement;
  let wrap = item.parentElement;
  let list = wrap.parentElement;
  let description = list.previousElementSibling;

  // получаем из html текст forWomen forMen.... убираем лишние пробелы и все приводим в нижний шрифт
  let departmentName = description
    .querySelector("h1")
    .textContent.toLowerCase()
    .trim();

  // у нас в массиве свойство описанно вот так forMen,а в тексте FOR MEN
  // все приводим к одному варианту forMen
  let departmentNameProp = departmentName.replace(/ (\w)/g, (match, letter) =>
    letter.toUpperCase()
  );
  return departmentNameProp;
}

// Haircut || Hair dyed || Hair Straightened || .....
function getServiceTypeText(element) {
  let item = element.parentElement;
  let serviceType = item.querySelector("h3").textContent.toLowerCase().trim();
  return serviceType;
}

function updateOrderProcessingContentFirstScreen(newSrc, array, h1) {
  const button = document.querySelector(".order_processing_button button");
  const orderProcessingContainer = document.querySelector(".order_processing");
  const closeBtn = orderProcessingContainer.querySelector(
    ".order_processing__service-info__header__close"
  );
  // выводим такую же картинку как и карточке на которою нажали
  changeImageSrc(orderProcessingContainer, newSrc);
  // меняем заголовок
  updateH1(orderProcessingContainer, h1);
  // выводим список услуг
  addServicesToHtml(orderProcessingContainer, array);
  // показываем элемент
  orderProcessingContainer.classList.add("show");
  closeScreen(closeBtn, orderProcessingContainer, "show");
}

function updateH1(element, newText) {
  let h1 = element.querySelector("h1");
  h1.textContent = newText;
}

function addServicesToHtml(element, array) {
  let ul = element.querySelector("ul");
  ul.innerHTML = "";
  array.map((item) => {
    let li = document.createElement("li");
    let serviceName = document.createElement("h2");
    let price = document.createElement("h2");

    serviceName.textContent = item.name;
    price.textContent = `chf ${item.price}`;

    li.appendChild(serviceName);
    li.appendChild(price);
    ul.appendChild(li);
  });
}
function changeImageSrc(element, newSrc) {
  console.log(element, newSrc);
  let image = element.querySelector("img");
  image.src = newSrc;
}

function closeScreen(buttonPress, closeElement, className) {
  buttonPress.addEventListener("click", function () {
    toggleScrollBody(false);
    closeElement.classList.remove(className);
  });
}
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
