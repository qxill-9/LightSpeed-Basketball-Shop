//3:00:10
'use strict';

const addEventOnElem = function (elem , type , callback) {
    if(elem.length > 1) {
        for(let i = 0 ; i < elem.length ; i++){
            elem[i].addEventListener(type,callback);
        }
    }else {
        elem.addEventListener(type,callback);
    }
}

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");

const headerActive = function () {
    if(window.scrollY > 150) {
        header.classList.add("active")
    } else {
        header.classList.remove("active")
    }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
    if (lastScrolledPos >= window.scrollY) {
        header.classList.remove("header-hide");
    }else {
        header.classList.add("header-hide");
    }

    lastScrolledPos = window.scrollY
}

addEventOnElem(window, "scroll", headerSticky);

const section = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
    for (let i = 0 ; i < section.length ; i++) {
        if(section[i].getBoundingClientRect().top < window.innerHeight * 0.85) {
            section[i].classList.add("active");
        }else {
            section[i].classList.remove("active");
        }
    }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

/* ===== FAVORITE SYSTEM ===== */

const favoriteBtns = document.querySelectorAll(".favorite-btn");

// load favorites
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

// header badge
const favoriteBadge = document.querySelector(
  '.header-action-btn[aria-label="favorite item"] .btn-badge'
);

const updateFavoriteBadge = () => {
  if (favoriteBadge) {
    favoriteBadge.textContent = favorites.length;
  }
};

// init state
favoriteBtns.forEach(btn => {
  const id = btn.dataset.id;
  const icon = btn.querySelector("ion-icon");

  if (favorites.includes(id)) {
    btn.classList.add("active");
    icon.setAttribute("name", "star");
  }

  btn.addEventListener("click", () => toggleFavorite(btn));
});

function toggleFavorite(btn) {
  const id = btn.dataset.id;
  const icon = btn.querySelector("ion-icon");

  if (favorites.includes(id)) {
    favorites = favorites.filter(item => item !== id);
    btn.classList.remove("active");
    icon.setAttribute("name", "star-outline");
  } else {
    favorites.push(id);
    btn.classList.add("active");
    icon.setAttribute("name", "star");
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
  updateFavoriteBadge();
}

updateFavoriteBadge();

/* ===== ADD TO CART SYSTEM ===== */

const cartButtons = document.querySelectorAll(".cart-btn");
const cartCount = document.querySelector('.header-action-btn[aria-label="cart item"] .btn-badge');

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/* Update badge number */
function updateCartUI() {
  if(cartCount){
    cartCount.textContent = cart.length;
  }
}


/* Restore saved cart */
cartButtons.forEach(button => {

  const id = button.dataset.id;
  const icon = button.querySelector("ion-icon");

  if(cart.includes(id)){
    button.classList.add("active");
    if(icon) icon.setAttribute("name","bag");
  }

  button.addEventListener("click", () => {

    if(cart.includes(id)){

      // Remove item
      cart = cart.filter(item => item !== id);
      button.classList.remove("active");

      if(icon) icon.setAttribute("name","bag-handle-outline");

    } else {

      // Add item
      cart.push(id);
      button.classList.add("active");

      if(icon) icon.setAttribute("name","bag");

    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();

  });

});

updateCartUI();

/* ===== HERO SLIDER ===== */

const track = document.querySelector(".hero-track");
const slides = document.querySelectorAll(".hero-slide");
const nextBtn = document.querySelector(".slide-btn.next");
const prevBtn = document.querySelector(".slide-btn.prev");

let index = 0;

function updateSlider() {
  track.style.transform = `translateX(-${index * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
});

/* Auto slide every 5 seconds */
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 5000);