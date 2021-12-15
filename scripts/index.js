"use strict";

const burgerBtn = document.querySelector(".burger");
const headerMenuContainer = document.querySelector(".header__menu-container");
const switcherThems = document.querySelector(".switcher-thems__switcher");

//function
function changeCustomProperties(prop, val) {
  document.documentElement.style.setProperty(prop, val);
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

switcherThems.addEventListener("click", () => {
  const sunImage = document.querySelector(".switcher-thems__image_type_sun");
  const monthImage = document.querySelector(".switcher-thems__image_type_month");
  if (!switcherThems.hasAttribute("data-them")) {
    switcherThems.setAttribute("data-them", "dark");
    changeCustomProperties("--left", "24px");
    changeCustomProperties("--color-page", "#333");
    changeCustomProperties("--color-title", "#fff");
    changeCustomProperties("--close-icon", "url(../images/close-white.svg)");
    changeCustomProperties("--color-switcher-bg", "#545454");
    changeCustomProperties("--color-burger", "#fff");
    sunImage.setAttribute("src", "./images/sun-dark.svg");
    monthImage.setAttribute("src", "./images/month-dark.svg");
  } else {
    switcherThems.removeAttribute("data-them", "dark");
    changeCustomProperties("--left", "0");
    changeCustomProperties("--color-page", "#f4f4f4");
    changeCustomProperties("--color-title", "#151515");
    changeCustomProperties("--close-icon", "url(../images/close.svg)");
    changeCustomProperties("--color-switcher-bg", "#fff");
    changeCustomProperties("--color-burger", "#151515");
    sunImage.setAttribute("src", "./images/sun.svg");
    monthImage.setAttribute("src", "./images/month.svg");
  }
});
