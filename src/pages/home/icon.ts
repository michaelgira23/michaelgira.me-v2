import anime from 'animejs';

const outline = document.querySelector('.icon path');

export function outlinePercent() {
	anime({
		targets: outline,
		strokeDashoffset: [anime.setDashoffset, 0],
		easing: 'easeInOutSine',
		duration: 1500
		// delay: function(el, i) { return i * 250 },
		// direction: 'alternate',
		// loop: true
	});
}
