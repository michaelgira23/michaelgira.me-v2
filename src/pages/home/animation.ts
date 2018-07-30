import 'babel-polyfill';

import { fillPercent, outlinePercent } from './icon';
import { Swipe, SwipeConfig } from './swipe';
import { fadeDescIn, fadeNameIn } from './title';

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

// for (const swipeConfig of swipes) {
// 	const swipe = new Swipe(swipeConfig);
// 	setTimeout(() => {
// 		swipe.swipeMid();
//
// 		setTimeout(() => {
// 			swipe.swipeOut();
// 		}, swipeConfig.delay);
// 	}, swipeConfig.start);
// }

// (document.querySelector('button') as HTMLButtonElement).onclick = init;
init();
async function init() {
	await outlinePercent();
	await fillPercent();
	fadeNameIn();
	setTimeout(() => fadeDescIn(), 50);
}
