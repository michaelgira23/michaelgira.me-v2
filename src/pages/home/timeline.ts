import anime from 'animejs';

const icon = document.querySelector('.icon') as SVGElement;
const outline = document.querySelector('.icon #outline') as SVGElement;
const fill = document.querySelector('.icon #fill-black') as SVGStopElement;

const titleName = document.querySelector('.title .name');
const titleDesc = document.querySelector('.title .desc');

const timeline = anime.timeline();
timeline
	.add({
		targets: outline,
		duration: 1000,
		easing: 'easeInOutSine',
		strokeDashoffset: [anime.setDashoffset, 0]
	})
	.add({
		targets: fill,
		duration: 500,
		easing: 'easeInOutExpo',
		y: 1
	})
	.add({
		targets: icon,
		duration: 1000,
		easing: 'easeInOutExpo',
		translateX: ['50%', 0]
	})
	.add({
		offset: '-=1000',
		targets: titleName,
		duration: 1000,
		easing: 'easeInOutExpo',
		translateX: ['-100%', 0],
		opacity: 1
	})
	.add({
		offset: '-=950',
		targets: titleDesc,
		duration: 1000,
		easing: 'easeInOutExpo',
		translateX: ['-100%', 0],
		opacity: 1
	});
