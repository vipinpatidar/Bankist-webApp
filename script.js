"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////////////////////////////  //////////////////////////////////
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const allButtons = document.getElementsByTagName("button");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const message = document.createElement("div");
const tabs = document.querySelectorAll(".operations__tab");
const tabContainer = document.querySelector(".operations__tab-container");
const tabsContant = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

/////////////////////////////////////////////////////////////////////

/// creating Cookie and appending in header
message.classList.add("message");

message.innerHTML =
  'We use cookies for improve functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.prepend(message.cloneNode(true));
// header.before(message);
// console.log(header);

const cookieBtn = document.querySelector(".btn--close-cookie");
cookieBtn.onclick = () => {
  message.remove();
};

// styling with JS

message.style.backgroundColor = "#37383d";
message.style.width = "100vw";

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 16 + "px";

// document.documentElement.style.setProperty("visibility", "hidden");

// Attributes

btnScrollTo.addEventListener("click", function (e) {
  const slcoords = section1.getBoundingClientRect();
  console.log(slcoords);

  console.log(e.target.getBoundingClientRect());

  console.log("current scroll(x/Y):", window.pageXOffset, window.pageYOffset);

  // Scrolling

  // window.scrollTo(
  //   slcoords.left + window.pageXOffset,
  //   slcoords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: slcoords.left + window.pageXOffset,
  //   top: slcoords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});

// Page navigation (event delegation)
/* // old way
document.querySelectorAll(".nav__link").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const id = this.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});*/

//1. Add event listeners to common parent elements
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");

    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/// Tabbed component with event delegation

tabContainer.addEventListener("click", function (e) {
  const clickedEl = e.target.closest(".operations__tab");
  // Guard clause
  console.log(clickedEl);
  if (!clickedEl) return;

  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });

  clickedEl.classList.add("operations__tab--active");

  tabsContant.forEach((contant) => {
    contant.classList.remove("operations__content--active");
  });

  document
    .querySelector(`.operations__content--${clickedEl.dataset.tab}`)
    .classList.add("operations__content--active");
});

// on hover menu fade animation

const handleHoverEffect = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
// with bind handleHoverEffect function get arrgument as this and handleHoverEffect behave link event function
nav.addEventListener("mouseover", handleHoverEffect.bind(0.4));
nav.addEventListener("mouseout", handleHoverEffect.bind(1));

//Sticky navigation
// new way
/*
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

const obsOptions = {
  root: null,
  threshold: [0, 0.2],
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
*/
//on header
const headerHeight = nav.getBoundingClientRect().height;
// console.log(headerHeight);

const haderObsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    MobilNav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  } else {
    nav.classList.remove("sticky");
    MobilNav.style.backgroundColor = "#f3f3f3";
  }
};
const headOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
};

const headerObserver = new IntersectionObserver(haderObsCallback, headOptions);
headerObserver.observe(header);

//Reveal Section

const section1ObsCallback = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");

  observer.unobserve(entry.target);
};

const secOptions = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  section1ObsCallback,
  secOptions
);
allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const imgCallback = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgOption = {
  root: null,
  threshold: 0.2,
  rootMargin: "150px",
};

const imgObserver = new IntersectionObserver(imgCallback, imgOption);

imgTargets.forEach((image) => {
  imgObserver.observe(image);
});

/////////////////Slider component /////////////////////////
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  function transSliders(current) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - current) * 100}%)`;
    });
  }
  // activate dots
  const activeDot = function (slideNo) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slideNo}"]`)
      .classList.add("dots__dot--active");
  };

  // Next slide
  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    transSliders(currentSlide);
    activeDot(currentSlide);
  };

  btnRight.addEventListener("click", nextSlide);
  // Keyboard
  document.addEventListener("keydown", (e) => {
    e.key === "ArrowRight" && nextSlide();
  });
  // previous slide
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else currentSlide--;
    transSliders(currentSlide);
    activeDot(currentSlide);
  };

  btnLeft.addEventListener("click", prevSlide);
  // Keyboard
  document.addEventListener("keydown", (e) => {
    e.key === "ArrowLeft" && prevSlide();
  });

  // Creating Dots in Slider
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  dotContainer.addEventListener("click", function (e) {
    if (e.target.dataset.slide) {
      const { slide } = e.target.dataset;
      transSliders(slide);
      activeDot(slide);
    }
  });

  // initial function
  function init() {
    transSliders(0);
    createDots();
    activeDot(0);
  }
  init();
};
slider();
/* old Way and low preformance 
const initialCoords = section1.getBoundingClientRect();

console.log(initialCoords);
window.addEventListener("scroll", function (e) {
  console.log(window.scrollY);

  if (window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});*/
// Event capturing , bubbling
/*
const random = (max, min) => Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("link", e.target, e.currentTarget);
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("UL", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener(
  "click",
  function (e) {
    this.style.backgroundColor = randomColor();
    console.log("navbar", e.target, e.currentTarget);
  },
  true
);
*/
/*

console.log(h1);
console.log(h1.children);

const h1 = document.querySelector("h1");
h1.closest("div").style.backgroundColor = "red";
[...h1.parentElement.children].forEach((el) => {
  if (el !== h1) {
    el.style.transform = "scale(0.5)";
  }
});*/

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});

window.addEventListener("load", function (e) {
  console.log("page fully loaded", e);
});

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = " ";
// });

/*//////////////////////////////////////////////////////////*/
/*/////////////////////////// Mobile Nav JS //////////////*/
/*//////////////////////////////////////////////////////////*/

const openMobilNav = document.querySelector("#open-nav");
const closeMobilNav = document.querySelector("#close-nav");
const MobilNav = document.querySelector(".mobile-nav");

openMobilNav.addEventListener("click", closeOpen);
closeMobilNav.addEventListener("click", closeOpen);

function closeOpen() {
  openMobilNav.classList.toggle("hide");
  closeMobilNav.classList.toggle("hide");
  MobilNav.classList.toggle("tarsMobile-nav");
}
