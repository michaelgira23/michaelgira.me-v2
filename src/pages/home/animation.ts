import { Swipe, SwipeConfig } from './swipe';

import anime from 'animejs';
import { distance } from '../../shared/utils';
const svgns = 'http://www.w3.org/2000/svg';
const svgViewboxWidth = 100;
const svgViewboxHeight = 100;
const svg = document.querySelector('.animation-overlay') as Element;

interface SwipeSequence extends SwipeConfig {
	start: number;
	delay: number;
}

const swipeColors = [
	'#ffffff',
	// '#fcecee',
	// '#f9d9dd',
	// '#f7c6cc',
	// '#f4b3bc',
	// '#f1a0ab',
	// '#ef8e9a',
	// '#ec7b89',
	'#e96879',
	// '#e75568',
	'#e44257',
	// '#e23047',
	'#ce2c41'
	// '#b9283b',
	// '#a52334',
	// '#901f2e',
	// '#7c1b27'
].reverse();

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
	},
	{
		start: 450,
		delay: 1000,
		color: '#ffffff'
	}
];

// for (const swipeConfig of swipes) {
// 	const swipe = new Swipe(swipeConfig);
// 	setTimeout(() => {
		// swipe.swipeMid();

		// setTimeout(() => {
		// 	swipe.swipeOut();
		// }, swipeConfig.delay);
// 	}, swipeConfig.start);
// }

swipeLoop(0);
function swipeLoop(i: number) {
	if (i < swipes.length) {
		swipef(swipeColors[i]);
		setTimeout(() => swipeLoop(++i), 250);
	}
}

function swipef(color = '#e23047', heightPercent = 1) {
	const diagonalWidth = distance(0, 0, svgViewboxWidth, svgViewboxHeight);
	const radialWidth = distance(0, 0, svgViewboxWidth / 2, svgViewboxHeight / 2);

	const width = diagonalWidth;
	const height = diagonalWidth * heightPercent;

	const rect = document.createElementNS(svgns, 'rect');
	const xFrom = svgViewboxWidth - (width / 2);
	const yFrom = svgViewboxHeight;
	const yTo = yFrom - diagonalWidth;
	rect.setAttributeNS(null, 'x', xFrom.toString());
	rect.setAttributeNS(null, 'y', yFrom.toString());
	rect.setAttributeNS(null, 'width', width.toString());
	rect.setAttributeNS(null, 'height', height.toString());
	rect.setAttributeNS(null, 'transform', `rotate(-45, ${svgViewboxWidth}, ${svgViewboxHeight})`);
	rect.setAttributeNS(null, 'fill', color);

	svg.appendChild(rect);

	anime({
		targets: rect,
		y: yTo,
		duration: 1000,
		easing: 'easeInOutExpo'
	});
}
