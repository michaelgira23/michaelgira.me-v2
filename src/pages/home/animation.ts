import { Swipe, SwipeConfig } from './swipe';

interface SwipeSequence extends SwipeConfig {
	start: number;
	delay: number;
}

// const swipeColors = [
// 	'#ffffff',
// 	// '#fcecee',
// 	// '#f9d9dd',
// 	// '#f7c6cc',
// 	// '#f4b3bc',
// 	// '#f1a0ab',
// 	// '#ef8e9a',
// 	// '#ec7b89',
// 	'#e96879',
// 	// '#e75568',
// 	'#e44257',
// 	// '#e23047',
// 	'#ce2c41'
// 	// '#b9283b',
// 	// '#a52334',
// 	// '#901f2e',
// 	// '#7c1b27'
// ].reverse();

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

for (const swipeConfig of swipes) {
	const swipe = new Swipe(swipeConfig);
	setTimeout(() => {
		swipe.swipeMid();

		setTimeout(() => {
			swipe.swipeOut();
		}, swipeConfig.delay);
	}, swipeConfig.start);
}

// const swipe = new Swipe(swipes[0]);
// swipe.swipeMid();
//
// setTimeout(() => {
// 	swipe.swipeOut();
// }, 1500);
