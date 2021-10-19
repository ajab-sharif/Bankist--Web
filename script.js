'use strict';
///////////////////////////////////////
// Element SELECTING  

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const navigation = document.querySelectorAll('.nav__link');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav__links');
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
nav.addEventListener('click', function (e) {
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
  const s1coords = section1.getBoundingClientRect();
  /*
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
