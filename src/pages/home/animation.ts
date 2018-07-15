import { distance } from '../../shared/utils';
import animejs from 'animejs';
// Fix cause Typescript doesn't think there's a default import for animejs
const anime: (params: anime.AnimeParams) => anime.AnimeInstance = animejs;

// declare function anime(params: anime.AnimeParams): anime.AnimeInstance;

const svgns = 'http://www.w3.org/2000/svg';
const svgViewboxWidth = 100;
const svgViewboxHeight = 100;
const svg = document.querySelector('.animation-overlay');

const swipes = [
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
	'#ce2c41',
	// '#b9283b',
	// '#a52334',
	// '#901f2e',
	// '#7c1b27'
].reverse();

swipeLoop(0);
function swipeLoop(i: number) {
	if (i < swipes.length) {
		swipe(swipes[i]);
		setTimeout(() => swipeLoop(++i), 250);
	}
}

function swipe(color = '#e23047', heightPercent = 1) {
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
