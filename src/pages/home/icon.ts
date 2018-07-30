import anime from 'animejs';

const outline = document.querySelector('.icon #outline') as SVGElement;
const fill = document.querySelector('.icon #fill-black') as SVGStopElement;

export function outlinePercent(percent = 1) {
	return anime({
		targets: outline,
		duration: 1000,
		easing: 'easeInOutSine',
		strokeDashoffset: [anime.setDashoffset, () => anime.setDashoffset(outline) * (1 - percent)]
	}).finished;
}

export function fillPercent(percent = 1) {
	return anime({
		targets: fill,
		duration: 500,
		easing: 'easeInOutExpo',
		y: (1 - percent) + 1
	}).finished;
}
