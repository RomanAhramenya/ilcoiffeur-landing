// import { generateCalendar } from "./calendar.js";
import { langArr } from "./lang.js";
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
  let counterSlider = 0; // колличество пикселей для смещения по X
  let isSideSLiderScroll = "left"; // в какую сторону крутим слайдер

  let sliderAutoScroll = setInterval(() => {
    if (isSideSLiderScroll === "left") counterSlider++;
    if (isSideSLiderScroll === "right") counterSlider--;
    carousel.scrollTo(counterSlider, 0); // автосмещение скролла

    if (
      carouselImages[0].clientWidth * carouselImages.length + // ширина одной картики * на количество
        10 * (carouselImages.length - 1) - // растояние px между картинками умноженное на количество минус один
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
    if (Math.ceil(carousel.scrollLeft) !== counterSlider) {
      // this magic
      clearInterval(sliderAutoScroll);
    }
  });

  // Мультиязычность сайта

  const select = document.querySelector(".lang__select");

  select.addEventListener("change", changeLanguage); // изменять при выборе языка

  let storagelang = localStorage.getItem("lang"); // получаем localstorage

  if (storagelang && storagelang !== "eng") {
    select.value = storagelang;
    changeLanguage();
  } // если сторадж не пустой и не английский язык то запускаем изменение языка

  function changeLanguage() {
    const value = select.value;
    localStorage.setItem("lang", value); // сохраняем в сторадж

    for (let key in langArr) {
      // бежим по ключам в файле с переводом

      for (let className in langArr[key]) {
        const isValid = document.querySelector(`.lang-${key}-${className}`);

        if (key === "menu" && isValid) {
          [...document.querySelectorAll(`.lang-${key}-${className}`)].map(
            (element) => {
              element.innerHTML = langArr[key][className][value];
            }
          );
        }
        if (isValid) {
          document.querySelector(`.lang-${key}-${className}`).innerHTML =
            langArr[key][className][value];
        }
      }
    }
  }
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
