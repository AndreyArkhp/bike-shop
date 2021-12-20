"use strict";

const burgerBtn = document.querySelector(".burger");
const headerMenuContainer = document.querySelector(".header__menu-container");
const switcherThems = document.querySelector(".switcher-thems__switcher");
const arrowLeftSlider = document.querySelector(".slider__button-left");
const arrowRightSlider = document.querySelector(".slider__button-right");
const textsSlider = document.querySelectorAll(".slider__text-container");
const imagesSlider = Array.from(document.querySelectorAll(".slider__image"));
const imageContainerSlider = document.querySelector(".slider__image-container");
const timeChangeImage =
  parseFloat(getComputedStyle(imageContainerSlider).getPropertyValue("--time-change-image")) * 1000;
const iconsRoadSlider = [
  "../images/highway-line.svg",
  "../images/gravel-line.svg",
  "../images/tt-line.svg",
];

//function
function setCustomProperties(prop, val) {
  document.documentElement.style.setProperty(prop, val);
}
function delCustomProperties() {
  document.documentElement.style = "";
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

//change theme
switcherThems.addEventListener("click", () => {
  const sunImage = document.querySelector(".switcher-thems__image_type_sun");
  const monthImage = document.querySelector(".switcher-thems__image_type_month");
  const switchCheckbox = document.querySelector(".switcher-thems__checkbox");
  if (!switchCheckbox.checked) {
    setCustomProperties("--left", "24px");
    setCustomProperties("--color-page", "#333");
    setCustomProperties("--close-icon", "url(../images/close-white.svg)");
    setCustomProperties("--color-switcher-bg", "#545454");
    setCustomProperties("--color-black", "#fff");
    setCustomProperties("--color-grey", "#E6E6E6");
    setCustomProperties("--color-bike-name-line", "#707070");
    sunImage.setAttribute("src", "./images/sun-dark.svg");
    monthImage.setAttribute("src", "./images/month-dark.svg");
  } else {
    delCustomProperties();
    setCustomProperties("--close-icon", "url(../images/close.svg)");
    sunImage.setAttribute("src", "./images/sun.svg");
    monthImage.setAttribute("src", "./images/month.svg");
  }
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
  textsSlider[positionVisibleSliderText].classList.remove("slider__text-container_visible");

  if (mathStr === "plus") {
    positionVisibleSliderText < 2 ? positionVisibleSliderText++ : (positionVisibleSliderText = 0);
  } else {
    positionVisibleSliderText === 0 ? (positionVisibleSliderText = 2) : positionVisibleSliderText--;
  }

  textsSlider[positionVisibleSliderText].classList.add("slider__text-container_visible");
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
});
