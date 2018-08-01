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
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['50%', 0]
	})
	.add({
		offset: '-=500',
		targets: titleName,
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['5rem', 0],
		opacity: 1
	})
	.add({
		offset: '-=450',
		targets: titleDesc,
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['5rem', 0],
		opacity: 1
	});
