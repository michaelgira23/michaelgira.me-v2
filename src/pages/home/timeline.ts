import anime from 'animejs';
import { Swipe, SwipeConfig } from './swipe';

interface SwipeSequence extends SwipeConfig {
	start: number;
	delay: number;
}

const swipes: SwipeSequence[] = [
	{
		start: 0,
		delay: 1000,
		color: '#ce2c41'
	},
	{
		start: 250,
		delay: 1000,
		color: '#e44257'
	},
	{
		start: 350,
		delay: 1000,
		color: '#e96879'
	// },
	// {
	// 	start: 450,
	// 	delay: 1000,
	// 	color: '#ffffff'
	}
];

const $body = document.body;

const $icon = document.querySelector('.icon') as SVGElement;
const $outline = document.querySelector('.icon #outline') as SVGElement;
const $fill = document.querySelector('.icon #fill__black') as SVGStopElement;

const $titleName = document.querySelector('.title__name');
const $titleDesc = document.querySelector('.title__desc');

const timeline = anime.timeline();
timeline
	.add({
		targets: $outline,
		duration: 1000,
		easing: 'easeInOutSine',
		strokeDashoffset: [anime.setDashoffset, 0]
	})
	.add({
		targets: $fill,
		duration: 500,
		easing: 'easeInOutExpo',
		y: 1
	})
	.add({
		targets: $icon,
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['50%', 0]
	})
	.add({
		offset: '-=500',
		targets: $titleName,
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['5rem', 0],
		opacity: 1
	})
	.add({
		offset: '-=450',
		targets: $titleDesc,
		duration: 500,
		easing: 'easeInOutExpo',
		translateX: ['5rem', 0],
		opacity: 1
	});

timeline.complete = () => {
	console.log('All done!');

	for (const swipeConfig of swipes) {
		const swipe = new Swipe(swipeConfig);
		setTimeout(() => {
			swipe.swipeMid();

			setTimeout(() => {
				$body.classList.add('resume');
				swipe.swipeOut();
			}, swipeConfig.delay);
		}, swipeConfig.start);
	}
};
