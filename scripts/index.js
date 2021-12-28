"use strict";

const burgerBtn = document.querySelector(".burger");
const headerMenuContainer = document.querySelector(".header__menu-container");
const switcherThems = document.querySelectorAll(".switcher-thems__switcher");
const switcherThemsMini = document.querySelector(".footer__switcher-mini-label");
const arrowLeftSlider = document.querySelector(".slider__button-left");
const arrowRightSlider = document.querySelector(".slider__button-right");
const titleSlider = document.querySelectorAll(".slider__title");
const textSlider = document.querySelectorAll(".slider__text");
const imagesSlider = Array.from(document.querySelectorAll(".slider__image"));
const imageContainerSlider = document.querySelector(".slider__image-container");
const menuBikeCards = document.querySelectorAll(".bike-cards__list-button");
const containerBikeCards = document.querySelectorAll(".bike-cards__image-container");
const selectBikeCards = document.querySelector(".bike-cards__navigation-select");
const buttonCarouselBikeCards = document.querySelectorAll(".bike-cards__button-link");
const footerEmailInput = document.querySelector(".footer__form-input");
const footerButtonInput = document.querySelector(".footer__form-button");

const timeChangeImage =
  parseFloat(getComputedStyle(imageContainerSlider).getPropertyValue("--time-change-image")) * 1000;
const iconsRoadSlider = [
  "../images/highway-line.svg",
  "../images/gravel-line.svg",
  "../images/tt-line.svg",
];
const bikeCardsObj = {
  highway: containerBikeCards[0],
  gravel: containerBikeCards[1],
  tt: containerBikeCards[2],
};
let themWhite = true;
//function
function showInputButton() {
  footerButtonInput.style.color = " #151515";
}

function dontShowInputButton() {
  footerButtonInput.style.color = "transparent";
}

function setCustomProperties(prop, val) {
  document.documentElement.style.setProperty(prop, val);
}
function delCustomProperties() {
  document.documentElement.style = "";
}

function changeTheme() {
  const sunImage = document.querySelector(".switcher-thems__image_type_sun");
  const monthImage = document.querySelector(".switcher-thems__image_type_month");
  const switchCheckbox = document.querySelector(".switcher-thems__checkbox");
  if (themWhite && !switchCheckbox.checked) {
    setCustomProperties("--left", "24px");
    setCustomProperties("--color-page", "#333");
    setCustomProperties("--close-icon", "url(../images/close-white.svg)");
    setCustomProperties("--color-switcher-bg", "#545454");
    setCustomProperties("--color-black", "#fff");
    setCustomProperties("--color-grey", "#E6E6E6");
    setCustomProperties("--color-bike-name-line", "#707070");
    setCustomProperties("--color-footer-bg", "#2f2f2f");
    setCustomProperties("--color-footer-copyright", "#565656");
    setCustomProperties("--color-arrow-bg", "#434343");
    setCustomProperties("--color-select-bg", "#434343");
    setCustomProperties("--arrow-previous", "url(../images/arrow-previous-white.svg)");
    setCustomProperties("--arrow-next", "url(../images/arrow-next-white.svg)");
    sunImage.setAttribute("src", "./images/sun-dark.svg");
    monthImage.setAttribute("src", "./images/month-dark.svg");

    themWhite = false;
  } else {
    delCustomProperties();
    setCustomProperties("--close-icon", "url(../images/close.svg)");
    sunImage.setAttribute("src", "./images/sun.svg");
    monthImage.setAttribute("src", "./images/month.svg");
    themWhite = true;
  }
}

function changeThemeMini() {
  const sunImage = document.querySelector(".switcher-thems__image_type_sun");
  const monthImage = document.querySelector(".switcher-thems__image_type_month");
  const switchCheckboxMini = document.querySelector(".footer__switcher-thems-checkbox");
  if (themWhite && switchCheckboxMini.checked) {
    setCustomProperties("--left", "24px");
    setCustomProperties("--color-page", "#333");
    setCustomProperties("--close-icon", "url(../images/close-white.svg)");
    setCustomProperties("--color-switcher-bg", "#545454");
    setCustomProperties("--color-black", "#fff");
    setCustomProperties("--color-grey", "#E6E6E6");
    setCustomProperties("--color-bike-name-line", "#707070");
    setCustomProperties("--color-footer-bg", "#2f2f2f");
    setCustomProperties("--color-footer-copyright", "#565656");
    setCustomProperties("--color-arrow-bg", "#434343");
    setCustomProperties("--color-select-bg", "#434343");
    setCustomProperties("--arrow-previous", "url(../images/arrow-previous-white.svg)");
    setCustomProperties("--arrow-next", "url(../images/arrow-next-white.svg)");
    sunImage.setAttribute("src", "./images/sun-dark.svg");
    monthImage.setAttribute("src", "./images/month-dark.svg");
    themWhite = false;
  } else {
    delCustomProperties();
    setCustomProperties("--close-icon", "url(../images/close.svg)");
    sunImage.setAttribute("src", "./images/sun.svg");
    monthImage.setAttribute("src", "./images/month.svg");
    themWhite = true;
  }
}

//change theme
switcherThems.forEach((switcher) => {
  switcher.addEventListener("click", () => {
    changeTheme();
  });
});

switcherThemsMini.addEventListener("click", () => {
  changeThemeMini();
});
//slider

let positionVisibleSliderText = 0;
let positionVisibleSliderImage = 3;
let imageWidth = parseFloat(getComputedStyle(imagesSlider[0]).width);
let positionImagesSlider = [];
for (let i = -6; i <= 6; i++) {
  positionImagesSlider.push(imageWidth * i + 40 * i);
}
resetPositionImageContainer(timeChangeImage);

function changeTextSlider(mathStr) {
  titleSlider[positionVisibleSliderText].classList.remove("slider__title_visible");
  textSlider[positionVisibleSliderText].classList.remove("slider__text_visible");

  if (mathStr === "plus") {
    positionVisibleSliderText < 2 ? positionVisibleSliderText++ : (positionVisibleSliderText = 0);
  } else {
    positionVisibleSliderText === 0 ? (positionVisibleSliderText = 2) : positionVisibleSliderText--;
  }

  titleSlider[positionVisibleSliderText].classList.add("slider__title_visible");
  textSlider[positionVisibleSliderText].classList.add("slider__text_visible");
  changeIconRoadSlider(positionVisibleSliderText);
}

function changeIconRoadSlider(position) {
  setCustomProperties("--road-icon", `url(${iconsRoadSlider[position]})`);
}

function changeImageSlider(direction) {
  imageContainerSlider.style = "";
  let transformValue;
  let numberPx;

  direction === "right" ? positionVisibleSliderImage-- : positionVisibleSliderImage++;
  numberPx = positionImagesSlider[positionVisibleSliderImage];
  transformValue = `translate(${numberPx}px,0)`;
  imageContainerSlider.style.transform = transformValue;
  if (positionVisibleSliderImage === 6 || positionVisibleSliderImage === 0) {
    resetPositionImageContainer(timeChangeImage);
  }
}

function resetPositionImageContainer(ms) {
  positionVisibleSliderImage = 3;
  setTimeout(() => {
    imageContainerSlider.style.transition = "none";

    imageContainerSlider.style.transform = `translate(${positionImagesSlider[3]}px,0)`;
  }, ms);
}

function delClassContainerBikeCards() {
  containerBikeCards.forEach((element) => {
    element.classList.remove("bike-cards__image-container_active");
  });
}

function delActiveBtnCarousel() {
  buttonCarouselBikeCards.forEach((btn) => {
    btn.classList.remove("bike-cards__button-link_active");
  });
}

//Listeners
burgerBtn.addEventListener("click", () => {
  if (burgerBtn.classList.contains("burger__triple-lines")) {
    burgerBtn.classList.remove("burger__triple-lines");
    burgerBtn.classList.add("burger__close");
    headerMenuContainer.classList.add("header__menu-container_active");
  } else {
    burgerBtn.classList.remove("burger__close");
    burgerBtn.classList.add("burger__triple-lines");
    headerMenuContainer.classList.remove("header__menu-container_active");
  }
});

arrowLeftSlider.addEventListener("click", () => {
  changeTextSlider("minus");
  changeImageSlider("left");
});
arrowRightSlider.addEventListener("click", () => {
  changeTextSlider("plus");
  changeImageSlider("right");
});

window.addEventListener("resize", () => {
  imageWidth = parseFloat(getComputedStyle(imagesSlider[0]).width);
  positionImagesSlider = [];
  for (let i = -6; i <= 6; i++) {
    positionImagesSlider.push(imageWidth * i + 40 * i);
  }
  imageContainerSlider.style.transition = "none";
  let numberPx = positionImagesSlider[positionVisibleSliderImage];
  imageContainerSlider.style.transform = `translate(${numberPx}px,0)`;
  const imageContainerBikeCards = document.querySelector(".bike-cards__image-container_active");
  imageContainerBikeCards.style = "";
  delActiveBtnCarousel();
  buttonCarouselBikeCards[0].classList.add("bike-cards__button-link_active");
});

menuBikeCards.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    menuBikeCards.forEach((btn) => {
      if (event.target !== btn) {
        btn.classList.remove("bike-cards__list-button_active");
      } else {
        btn.classList.add("bike-cards__list-button_active");
        selectBikeCards.value = btn.value;
        delClassContainerBikeCards();
        bikeCardsObj[btn.value].classList.add("bike-cards__image-container_active");
        buttonCarouselBikeCards[0].classList.add("bike-cards__button-link_active");
      }
    });
  });
});

selectBikeCards.addEventListener("change", () => {
  delClassContainerBikeCards();
  bikeCardsObj[selectBikeCards.value].classList.add("bike-cards__image-container_active");
  menuBikeCards.forEach((btn) => {
    if (btn.value === selectBikeCards.value) {
      btn.classList.add("bike-cards__list-button_active");
      delActiveBtnCarousel();
      buttonCarouselBikeCards[0].classList.add("bike-cards__button-link_active");
    } else {
      btn.classList.remove("bike-cards__list-button_active");
    }
  });
});

buttonCarouselBikeCards.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const imageContainerBikeCards = document.querySelector(".bike-cards__image-container_active");
    const imageBikeCards = imageContainerBikeCards.querySelectorAll(".bike-cards__link");
    const imageWidth = getComputedStyle(imageBikeCards[0]).width;
    delActiveBtnCarousel();
    switch (btn.value) {
      case "highway":
        btn.classList.add("bike-cards__button-link_active");
        imageContainerBikeCards.style = "";
        break;
      case "gravel":
        btn.classList.add("bike-cards__button-link_active");
        imageContainerBikeCards.style.transform = `translate(-${imageWidth},0)`;
        break;
      case "tt":
        btn.classList.add("bike-cards__button-link_active");
        imageContainerBikeCards.style.transform = `translate(-${parseFloat(imageWidth) * 2}px,0)`;
    }
  });
});

footerEmailInput.addEventListener("focus", () => {
  showInputButton();
});

footerEmailInput.addEventListener("blur", () => {
  dontShowInputButton();
});
