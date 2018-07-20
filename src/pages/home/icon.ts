import anime from 'animejs';

const outline = document.querySelector('.icon #outline') as SVGElement;
const fill = document.querySelector('.icon #fill-black') as SVGStopElement;

export function outlinePercent(percent = 1) {
	return anime({
		targets: outline,
		strokeDashoffset: [anime.setDashoffset, () => anime.setDashoffset(outline) * (1 - percent)],
		easing: 'easeInOutSine',
		duration: 1000
	}).finished;
}

export function fillPercent(percent = 1) {
	console.log('fill', fill);
	return anime({
		targets: fill,
		y: (1 - percent) + 0.5,
		// offset: `${percent * 100}%`,
		// offset: percent * 100,
		easing: 'easeInOutExpo',
		// easing: 'easeInOutSine',
		duration: 500
	}).finished;
}
