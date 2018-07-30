import anime from 'animejs';

const title = document.querySelector('.title');
const titleName = document.querySelector('.title .name');
const titleDesc = document.querySelector('.title .desc');

export function fadeNameIn() {
	return fadeIn(titleName);
}

export function fadeDescIn() {
	return fadeIn(titleDesc);
}

function fadeIn(targets: any) {
	return anime({
		targets,
		duration: 1000,
		easing: 'easeInOutExpo',
		translateX: ['-100%', 0],
		opacity: 1
	}).finished;
}
