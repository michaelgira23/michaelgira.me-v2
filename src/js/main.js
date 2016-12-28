window.onload = function() {

	var svg = document.getElementById('svg');
	var svgWidth = svg.width.baseVal.value;
	var svgHeight = svg.height.baseVal.value;

	var s = Snap(svg);

	// Create main rectangle
	var rectWidth = 100;
	var rectHeight = 200;
	var rectDimensions = generateRectDimensions(rectWidth, rectHeight);
	var dashArray = rectDimensions.perimeter / 2;

	var rect = s.rect(rectDimensions.x, rectDimensions.y, rectWidth, rectHeight);

	rect.attr({
		fill: 'rgba(0, 0, 0, 0)',
		stroke: '#111',
		strokeDasharray: '0 ' + dashArray
	});

	// Draw rectangle
	Snap.animate(0, 300, function(value) {
		rect.attr({
			strokeDasharray: value + ' ' + (dashArray - value)
		});
	}, 1000, easeInOutCirc, function() {

		// Make rectangle collapse to center

	});

	function generateRectDimensions(width, height) {
		return {
			x: (svgWidth - width) / 2,
			y: (svgHeight - height) / 2,
			perimeter: (width * 2) + (height * 2)
		};
	}

};
