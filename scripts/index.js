"use strict";

const burgerBtn = document.querySelector(".burger");
const headerMenuContainer = document.querySelector(".header__menu-container");
const switcherThems = document.querySelectorAll(".switcher-thems__switcher");
const switcherThemsMini = document.querySelector(".footer__switcher-mini-label");
const arrowLeftSlider = document.querySelector(".slider__button-previous");
const arrowRightSlider = document.querySelector(".slider__button-next");
const titleSlider = document.querySelectorAll(".select-road__title");
const textSlider = document.querySelectorAll(".select-road__text");
const imagesSlider = Array.from(document.querySelectorAll(".slider__image"));
const imageContainerSlider = document.querySelector(".slider__image-container");
const menuBikeCards = document.querySelectorAll(".bike-cards__list-button");
const containerBikeCards = document.querySelectorAll(".bike-cards__image-container");
const selectBikeCards = document.querySelector(".bike-cards__navigation-select");
const buttonCarouselBikeCards = document.querySelectorAll(".bike-cards__button-link");
const footerEmailInput = document.querySelector(".footer__form-input");
const footerButtonInput = document.querySelector(".footer__form-button");
const switchCheckbox = document.querySelector(".switcher-thems__checkbox");
const switchCheckboxMini = document.querySelector(".footer__switcher-thems-checkbox");

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
let positionVisibleSliderText;
let positionVisibleSliderImage;
let imageWidth;
let positionImagesSlider = [];

//change custome properties css
function setCustomProperties(prop, val) {
  document.documentElement.style.setProperty(prop, val);
}
function delCustomProperties() {
  document.documentElement.style = "";
}

//change theme
function changeTheme() {
  const sunImage = document.querySelector(".switcher-thems__image_type_sun");
  const monthImage = document.querySelector(".switcher-thems__image_type_month");
  const switcherThemsMini = document.querySelector(".footer__switcher-mini-label");
  if ((themWhite && !switchCheckbox.checked) || (themWhite && !switchCheckboxMini.checked)) {
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
    switcherThemsMini.classList.add("footer__switcher-mini-label_them_dark");
    themWhite = false;
    switchCheckbox.checked = true;
    switchCheckboxMini.checked = true;
  } else {
    delCustomProperties();
    setCustomProperties("--close-icon", "url(../images/close.svg)");
    sunImage.setAttribute("src", "./images/sun.svg");
    monthImage.setAttribute("src", "./images/month.svg");
    switcherThemsMini.classList.remove("footer__switcher-mini-label_them_dark");
    themWhite = true;
    switchCheckbox.checked = false;
    switchCheckboxMini.checked = false;
  }
}

switcherThems.forEach((switcher) => {
  switcher.addEventListener("click", () => {
    changeTheme();
  });
});

switcherThemsMini.addEventListener("click", () => {
  changeTheme();
});

//slider
function setInitialPositionSlider() {
  positionVisibleSliderText = 0;
  positionVisibleSliderImage = 3;
  setPositionImagesSlider();
  resetPositionImageContainer(timeChangeImage);
}

function setPositionImagesSlider() {
  imageWidth = parseFloat(getComputedStyle(imagesSlider[0]).width);
  positionImagesSlider = [];
  for (let i = -6; i <= 6; i++) {
    positionImagesSlider.push(imageWidth * i + 40 * i);
  }
}

function resetPositionImageContainer(ms) {
  positionVisibleSliderImage = 3;
  setTimeout(() => {
    imageContainerSlider.style.transition = "none";

    imageContainerSlider.style.transform = `translate(${positionImagesSlider[3]}px,0)`;
  }, ms);
}

function changeTextSlider(mathStr) {
  titleSlider[positionVisibleSliderText].classList.remove("select-road__title_visible");
  textSlider[positionVisibleSliderText].classList.remove("select-road__text_visible");

  if (mathStr === "plus") {
    positionVisibleSliderText < 2 ? positionVisibleSliderText++ : (positionVisibleSliderText = 0);
  } else {
    positionVisibleSliderText === 0 ? (positionVisibleSliderText = 2) : positionVisibleSliderText--;
  }

  titleSlider[positionVisibleSliderText].classList.add("select-road__title_visible");
  textSlider[positionVisibleSliderText].classList.add("select-road__text_visible");
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

setInitialPositionSlider();

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
  setPositionImagesSlider();
  let numberPx = positionImagesSlider[positionVisibleSliderImage];
  const imageContainerBikeCards = document.querySelector(".bike-cards__image-container_active");
  imageContainerSlider.style.transition = "none";
  imageContainerSlider.style.transform = `translate(${numberPx}px,0)`;
  imageContainerBikeCards.style = "";
  delActiveBtnCarousel();
  buttonCarouselBikeCards[0].classList.add("bike-cards__button-link_active");
});

//bike-cards carousel
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
  btn.addEventListener("click", () => {
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

//touch change image
const bikeCardsLinks = document.querySelectorAll(".bike-cards__link");
const imageContainerBikeCards = document.querySelector(".bike-cards__image-container_active");
const imageBikeCards = imageContainerBikeCards.querySelectorAll(".bike-cards__link");
let initialX;
let ofsetX;

bikeCardsLinks.forEach((link) => {
  link.addEventListener("touchstart", (event) => {
    initialX = event.touches[0].clientX;
  });
});

bikeCardsLinks.forEach((link) => {
  link.addEventListener("touchmove", (event) => {
    ofsetX = initialX - event.touches[0].clientX;
  });
});
let ofset = 0;
bikeCardsLinks.forEach((link) => {
  link.addEventListener("touchend", () => {
    const imageWidth = getComputedStyle(imageBikeCards[0]).width;

    if (ofsetX > 0) {
      if (parseFloat(imageWidth) * 2 > -ofset) {
        ofset -= parseFloat(imageWidth);
        imageContainerBikeCards.style.transform = `translate(${ofset}px,0)`;
        console.log(ofset);
      }
    } else {
      if (ofset < 0) {
        ofset += parseFloat(imageWidth);
        imageContainerBikeCards.style.transform = `translate(${ofset}px,0)`;
        console.log(ofset);
      }
    }
  });
});

//footer email
footerEmailInput.addEventListener("focus", () => {
  showInputButton();
});

footerEmailInput.addEventListener("blur", () => {
  dontShowInputButton();
});

function showInputButton() {
  footerButtonInput.style.color = " #151515";
  footerButtonInput.style.cursor = "pointer";
}

function dontShowInputButton() {
  footerButtonInput.style.color = "transparent";
  footerButtonInput.style.cursor = "text";
}
