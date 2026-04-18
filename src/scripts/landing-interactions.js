const revealElements = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.18, rootMargin: '0px 0px -6% 0px' },
	);

	for (const element of revealElements) {
		revealObserver.observe(element);
	}
} else {
	for (const element of revealElements) {
		element.classList.add('is-visible');
	}
}

for (const comparison of document.querySelectorAll('[data-comparison]')) {
	const range = comparison.querySelector('[data-comparison-range]');
	const after = comparison.querySelector('[data-comparison-after]');
	const handle = comparison.querySelector('[data-comparison-handle]');

	const updateComparison = () => {
		const value = Number(range.value);
		after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
		handle.style.left = `${value}%`;
	};

	if (range && after && handle) {
		updateComparison();
		range.addEventListener('input', updateComparison);
	}
}
