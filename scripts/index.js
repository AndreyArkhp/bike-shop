"use strict";

const burgerBtn = document.querySelector(".burger");
const headerMenuContainer = document.querySelector(".header__menu-container");
const switcherThems = document.querySelector(".switcher-thems__switcher");

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

//chenge theme
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
