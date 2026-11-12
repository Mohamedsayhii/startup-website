const nav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');

// ---------- Nav: solid background once the page is scrolled ----------

function updateNavBackground() {
	nav.classList.toggle('scrolled', window.scrollY > 20);
}

updateNavBackground();
window.addEventListener('scroll', updateNavBackground, { passive: true });

// ---------- Mobile menu ----------

function setMenuOpen(open) {
	nav.classList.toggle('open', open);
	menuToggle.setAttribute('aria-expanded', String(open));
	menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuToggle.addEventListener('click', () => {
	setMenuOpen(!nav.classList.contains('open'));
});

// Close after jumping to a section, on Escape, or when the screen widens
nav.querySelectorAll('a').forEach((link) =>
	link.addEventListener('click', () => setMenuOpen(false))
);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') setMenuOpen(false);
});

window.matchMedia('(min-width: 901px)').addEventListener('change', (e) => {
	if (e.matches) setMenuOpen(false);
});

// ---------- Reveal sections as they scroll into view ----------

const revealItems = document.querySelectorAll('.reveal');

// Stagger items that sit side by side (hero lines, cards in a grid)
revealItems.forEach((el) => {
	const siblings = [...el.parentElement.children].filter((c) =>
		c.classList.contains('reveal')
	);
	if (siblings.length > 1) {
		el.style.setProperty('--delay', `${siblings.indexOf(el) * 0.1}s`);
	}
});

if ('IntersectionObserver' in window) {
	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
	);
	revealItems.forEach((el) => observer.observe(el));
} else {
	revealItems.forEach((el) => el.classList.add('visible'));
}

// ---------- Contact form: open the visitor's email app ----------

const CONTACT_EMAIL = 'mohamedsayhii@outlook.com';
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const data = new FormData(form);
	const name = data.get('name').trim();
	const farm = data.get('farm').trim();

	const subject = `GroveWings enquiry from ${name}${farm ? ` (${farm})` : ''}`;
	const body = [
		data.get('message').trim(),
		'',
		'---',
		`Name: ${name}`,
		`Email: ${data.get('email').trim()}`,
		farm ? `Farm / organization: ${farm}` : null,
	]
		.filter((line) => line !== null)
		.join('\n');

	window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
		subject
	)}&body=${encodeURIComponent(body)}`;
});
