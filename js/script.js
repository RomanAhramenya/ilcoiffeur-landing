// import { generateCalendar } from "./calendar.js";

document.addEventListener("DOMContentLoaded", async () => {
  const body = document.querySelector("body");

  // const calendarWrapperElement = document.querySelector(".book__calendar");
  // const timeslotsWrapperElement = document.querySelector(".book__slots");
  // await generateCalendar(calendarWrapperElement, timeslotsWrapperElement);

  // const dateElements = document.querySelectorAll(".date");

  // СЛАЙДЕР В РАЗДЕЛЕ WORKS
  const carousel = document.querySelector(".carousel");
  const carouselWrapper = document.querySelector(".carousel__wrapper");
  const carouselImages = carouselWrapper.querySelectorAll("img");
  let counterSlider = 0;
  let isSideSLiderScroll = "left";
  let sliderAutoScroll = setInterval(() => {
    if (isSideSLiderScroll === "left") counterSlider++;
    if (isSideSLiderScroll === "right") counterSlider--;
    carousel.scrollTo(counterSlider, 0);
    if (
      carouselImages[0].clientWidth * carouselImages.length -
        carouselWrapper.clientWidth <=
      counterSlider
    ) {
      isSideSLiderScroll = "right";
    }
    if (counterSlider === 0) {
      isSideSLiderScroll = "left";
    }
  }, 10);
  carousel.addEventListener("scroll", (e) => {
    console.log(carousel.scrollLeft, counterSlider);
    if (Math.ceil(carousel.scrollLeft) !== counterSlider) {
      clearInterval(sliderAutoScroll);
    }
  });
  // dateElements.addEventListener("click", () => {
  //   const activeDateButton = dateElements.querySelector(".date-active");
  //   if (activeDateButton) {
  //     activeDateButton.classList.remove("date-active");
  //   }
  //   dateButtonElement.classList.add("date-active");
  //   dateActiveChanged();
  // });

  // function dateActiveChanged() {}
});
