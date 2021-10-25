'use strict';
///////////////////////////////////////
// Element SELECTING  

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const navigation = document.querySelector('.nav__links');
const link = document.querySelectorAll('.nav__link');
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// All FUNCTIONS
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
///////////////////////////////////////
// All EVENTLISTENER ----------------------->>>>>><😄>

///////////////////////////////////////
// WINDO Modals
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
// for KEYBORD  
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////
// Smooth SCROLLING  NAVIGATION 
// After ES6
navigation.addEventListener('click', function (e) {
  e.preventDefault();
  // Matching strategy
  if (e.target.classList.contains('nav__link') && e.target.getAttribute('href') !== '#') {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  };
});
/* // NOT Good Practice 
link.forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    const id = this.getAttribute('href');
    if (id === '#') return;
    // before ES6 
    // const scroll = document.querySelector(id).getBoundingClientRect();
    // window.scrollTo({
    //   left: scroll.left + window.pageXOffset,
    //   top: scroll.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });
    // After ES6 
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  })
});
*/
///////////////////////////////////////
// Smooth SCROLLING 

btnScrollTo.addEventListener('click', function (e) {
  /*
  const s1coords = section1.getBoundingClientRect();
  // Before ES6 without SMOOTH
  window.scrollTo(
    s1coords.left + window.pageXOffsets,
    s1coords.top + window.pageYOffset
  );
  // Before ES6 With SMOOTH 
  window.scrollTo({
    left: s1coords.left + window.pageXOffsets,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
  });
  */
  // After ES6 With SMOOTH
  section1.scrollIntoView({ behavior: 'smooth' });
});
///////////////////////////////////////
// TABBED component 

tabContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // Remove Active Classes
  tabs.forEach(c => c.classList.remove('operations__tab--active'));
  tabContent.forEach(t => t.classList.remove('operations__content--active'));
  if (!clicked) return;
  // Add Active Classes
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});
///////////////////////////////////////
// Navigation Fade Animations
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
///////////////////////////////////////
// Navigations STICKY 

//AFTER ES6
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
};
const option = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const observer = new IntersectionObserver(stickyNav, option);
observer.observe(header);

// BEFORE ES6
/*
window.addEventListener('scroll', function () {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords.top);
  console.log(window.scrollY);
  if (window.scrollY > s1coords.top + window.pageYOffset) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
});
*/
///////////////////////////////////////
// Reveal SECTIONS 
const allSections = document.querySelectorAll('.section');
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});
///////////////////////////////////////
// LAZY Image LODING 
const imgTargets = document.querySelectorAll('img[data-src]');

const imgLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  // replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(imgLoad, {
  root: null,
  threshold: 0,
  rootMargin: '-220px'
});

imgTargets.forEach(img => imgObserver.observe(img));

///////////////////////////////////////
// Slider Component  
const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  let maxSlide = slides.length - 1;

  // Slider FUNCTION 
  const gotoSlide = function (slide) {
    slides.forEach((slideEl, i) => {
      slideEl.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  const crateDots = function (e) {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`)
    });
  };

  const activeDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    document.querySelector(`.dots__dot[data-slide="${slide}"`).classList.add('dots__dot--active');
  };

  const nextSlider = function () {
    if (curSlide === maxSlide) curSlide = 0;
    else curSlide++;
    gotoSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlider = function () {
    if (curSlide === 0) curSlide = maxSlide;
    else curSlide--;
    gotoSlide(curSlide);
    activeDot(curSlide)
  };

  const initSlider = function () {
    gotoSlide(0);
    crateDots();
    activeDot(0);
  };
  initSlider();
  btnRight.addEventListener('click', nextSlider);
  btnLeft.addEventListener('click', prevSlider);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlider();
    e.key === 'ArrowLeft' && prevSlider();
  });
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      gotoSlide(slide);
      activeDot(slide)
    };
  });
};
slider();
