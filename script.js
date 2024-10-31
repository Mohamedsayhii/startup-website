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
