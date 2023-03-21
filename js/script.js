import { generateCalendar } from "./calendar.js";

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.querySelector("body");
  const btnHamburger = document.querySelector("#btnHamburger");
  const header = document.querySelector(".header");
  const overlay = document.querySelector(".overlay");
  const fadeElements = document.querySelectorAll(".has-fade");

  const carousel = document.querySelector(".carousel");
  const carouselWrapper = carousel?.querySelector(".corousel__wrapper");
  const carouselImages = carouselWrapper?.querySelectorAll("img");
  let counter = 0;

  const calendarWrapperElement = document.querySelector(".book__calendar");
  const timeslotsWrapperElement = document.querySelector(".book__slots");
  await generateCalendar(calendarWrapperElement, timeslotsWrapperElement);

  const dateElements = document.querySelectorAll(".date");

  carousel.addEventListener("scroll", () => {
    const scrollLeft = carousel.scrollLeft;
    const imageWidth = carouselImages[0].clientWidth;
    counter = Math.round(scrollLeft / imageWidth);
  });

  function scrollLeft() {
    counter--;
    if (counter < 0) {
      counter = 0;
    }
    carouselWrapper.style.transform = `translateX(-${counter * 100}%)`;
  }

  function scrollRight() {
    counter++;
    if (counter > carouselImages.length - 1) {
      counter = carouselImages.length - 1;
    }
    carouselWrapper.style.transform = `translateX(-${counter * 100}%)`;
  }

  function closeBurger() {
    body.classList.remove("noscroll");
    header.classList.remove("open");

    fadeElements.forEach(function (element) {
      element.classList.remove("fade-in");
      element.classList.add("fade-out");
    });
  }

  function openBurger() {
    body.classList.add("noscroll");
    header.classList.add("open");

    fadeElements.forEach(function (element) {
      element.classList.remove("fade-out");
      element.classList.add("fade-in");
    });
  }

  btnHamburger.addEventListener("click", function () {
    if (header.classList.contains("open")) {
      closeBurger();
    } else {
      openBurger();
    }
  });

  overlay.addEventListener("click", function () {
    closeBurger();
  });

  dateElements.addEventListener("click", () => {
    const activeDateButton = dateElements.querySelector(".date-active");
    if (activeDateButton) {
      activeDateButton.classList.remove("date-active");
    }
    dateButtonElement.classList.add("date-active");
    dateActiveChanged();
  });

  function dateActiveChanged() {}
});
