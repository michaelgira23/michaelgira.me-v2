import anime from 'animejs';
import { distance } from '../../shared/utils';

const svgns = 'http://www.w3.org/2000/svg';
const svgViewboxWidth = 100;
const svgViewboxHeight = 100;
const svg = document.querySelector('.animation-overlay') as Element;

const defaultSwipeOptions = {
	heightPercent: 1,
	easeDuration: 1000,
	easeFunction: 'easeInOutExpo'
};

export interface SwipeConfig {
	color: string;
	heightPercent?: number;
	easeDuration?: number;
	easeFunction?: string;
}

export class Swipe {

	color: string;
	heightPercent: number;
	easeDuration: number;
	easeFunction: string;

	rect: SVGRectElement;

	width: number;
	height: number;

	xFrom: number;
	yFrom: number;

	yMid: number;
	yTo: number;

	constructor(config: SwipeConfig) {
		config = Object.assign({}, defaultSwipeOptions, config);
		this.color = config.color;
		this.heightPercent = config.heightPercent as number;
		this.easeDuration = config.easeDuration as number;
		this.easeFunction = config.easeFunction as string;

		const diagonalWidth = distance(0, 0, svgViewboxWidth, svgViewboxHeight);
		// const radialWidth = distance(0, 0, svgViewboxWidth / 2, svgViewboxHeight / 2);

		this.width = diagonalWidth;
		this.height = diagonalWidth * this.heightPercent;

		this.rect = document.createElementNS(svgns, 'rect');
		this.xFrom = svgViewboxWidth - (this.width / 2);
		this.yFrom = svgViewboxHeight;
		this.yMid = this.yFrom - diagonalWidth;
		this.yTo = this.yMid - diagonalWidth;

		this.setAttribute('x', this.xFrom);
		this.setAttribute('y', this.yFrom);
		this.setAttribute('width', this.width);
		this.setAttribute('height', this.height);
		this.setAttribute('transform', `rotate(-45, ${svgViewboxWidth}, ${svgViewboxHeight})`);
		this.setAttribute('fill', this.color);

		svg.appendChild(this.rect);
	}

	swipeMid() {
		return this.animate(this.yMid);
	}

	swipeOut() {
		return this.animate(this.yTo);
	}

	private animate(y: number) {
		return anime({
			targets: this.rect,
			y,
			duration: this.easeDuration,
			easing: 'easeInOutExpo'
		}).finished;
	}

	private setAttribute(name: string, value: string | number) {
		(this.rect.setAttributeNS as any)(null, name, value.toString());
	}

}
