let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;
let autoSlide;

function showSlide(index) {
	const slideWidth = slides[0].clientWidth;
	document.querySelector('.carousel-slide').style.transform = `translateX(${
		-index * slideWidth
	}px)`;
}

function nextSlide() {
	slideIndex = (slideIndex + 1) % totalSlides;
	showSlide(slideIndex);
}

function prevSlide() {
	slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
	showSlide(slideIndex);
}

document.querySelector('.next').addEventListener('click', () => {
	clearInterval(autoSlide);
	nextSlide();
	autoSlide = setInterval(nextSlide, 5000);
});

document.querySelector('.prev').addEventListener('click', () => {
	clearInterval(autoSlide);
	prevSlide();
	autoSlide = setInterval(nextSlide, 5000);
});

function startCarousel() {
	autoSlide = setInterval(nextSlide, 5000);
}

window.addEventListener('resize', () => showSlide(slideIndex)); // Re-align on resize

startCarousel();

// Mobile menu
const nav = document.querySelector('nav');
const menuToggle = document.querySelector('.menu-toggle');

function setMenuOpen(open) {
	nav.classList.toggle('open', open);
	menuToggle.setAttribute('aria-expanded', String(open));
	menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => {
	setMenuOpen(!nav.classList.contains('open'));
});

// Close the menu after jumping to a section, on Escape, or when the screen widens
nav.querySelectorAll('a').forEach((link) =>
	link.addEventListener('click', () => setMenuOpen(false))
);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') setMenuOpen(false);
});

window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
	if (e.matches) setMenuOpen(false);
});
