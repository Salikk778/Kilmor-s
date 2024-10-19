const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");
const contactBar = document.getElementById("contactBar");
const contactForm = document.getElementById("contactForm");
const closeBtn = document.getElementById("closeBtn");

// Menu Button Toggle
menuBtn.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuBtnIcon.className = isOpen ? "ri-close-line" : "ri-menu-line";
});

// Close Menu on Link Click
navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.className = "ri-menu-line";
});

// Contact Button Toggle
contactBar.addEventListener("click", () => {
  contactForm.classList.toggle("show");
});

// Close Contact Form
closeBtn.addEventListener("click", () => {
  contactForm.classList.remove("show");
});

function initializeRoomSliders() {
  const roomCards = document.querySelectorAll('.room__card');

  roomCards.forEach(card => {
    const images = card.querySelector('.room__images');
    const prevBtn = card.querySelector('.room__nav-btn--prev');
    const nextBtn = card.querySelector('.room__nav-btn--next');
    let currentIndex = 0;

    function showImage(index) {
      images.style.transition = 'transform 0.5s ease';
      images.style.transform = `translateX(-${index * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.children.length) % images.children.length;
      showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.children.length;
      showImage(currentIndex);
    });

    showImage(currentIndex);
  });
}

// Scroll reveal animations with faster speed
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  reset: false,
});

const revealConfig = {
  delay: 300,
  interval: 200
};

// Apply ScrollReveal to the necessary elements
sr.reveal(".header__container", revealConfig);
sr.reveal(".about .image", { origin: "left", delay: 200 });
sr.reveal(".about .content", { origin: "right", delay: 200 });
sr.reveal(".room__card", revealConfig);
sr.reveal(".intro__content", { origin: "left", delay: 200 });
sr.reveal(".intro__video", { origin: "right", delay: 200 });
sr.reveal(".feature__card", revealConfig);
sr.reveal(".adventure-card", revealConfig);
sr.reveal(".distance-box", revealConfig);
sr.reveal(".footer__col", revealConfig);
sr.reveal(".what-to-do", revealConfig);
sr.reveal(".activity-card", revealConfig);

// Function to reveal boxes and activity cards on scroll
function revealOnScroll() {
  const elements = document.querySelectorAll('.distance-box, .activity-card');
  const windowHeight = window.innerHeight;

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    } else {
      element.classList.remove('show');
    }
  });
}

// Debounce function to limit scroll event firing rate
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Listen for Scroll Events with debounce
window.addEventListener('scroll', debounce(revealOnScroll));

// What to do section functionality
function initializeWhatToDo() {
  const activityCards = document.querySelectorAll('.activity-card');

  activityCards.forEach(card => {
    const cardInner = card.querySelector('.activity-card-inner');
    const frontImage = card.querySelector('.activity-card-front img');
    const backBlur = card.querySelector('.activity-card-back-blur');

    // Set the background image for the blurred back side
    if (frontImage && backBlur) {
      backBlur.style.backgroundImage = `url('${frontImage.src}')`;
    }

    // Hover effect for desktop
    card.addEventListener('mouseenter', () => {
      cardInner.style.transform = 'rotateY(180deg)';
    });

    card.addEventListener('mouseleave', () => {
      cardInner.style.transform = 'rotateY(0deg)';
    });

    // Click effect for mobile
    card.addEventListener('click', () => {
      cardInner.style.transform = 
        cardInner.style.transform === 'rotateY(180deg)' 
          ? 'rotateY(0deg)' 
          : 'rotateY(180deg)';
    });
  });
}

// Initialize everything after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeRoomSliders();
  initializeWhatToDo();
});