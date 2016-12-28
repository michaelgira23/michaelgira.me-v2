window.onload = function() {

	var svg = document.getElementById('svg');

	// while(svg.width.baseVal.value <= 0) {}

	var s = Snap(svg);

	var svgWidth = svg.width.baseVal.value;
	var svgHeight = svg.height.baseVal.value;

	console.log(svgWidth, svgHeight);

	// Create name
	var name = s.text(0, 0, 'Michael Gira')
		.attr({
			visibility: 'hidden'
		});

	// Increase font size until spans whole screen or is big enough
	var fontSize = 1;
	while(name.getBBox().width < (svgWidth - 80) && fontSize < 80) {
		name.attr({
			fontSize: ++fontSize
		});
	}

	var nameBounds = name.getBBox();
	var nameDimensions = generateRectDimensions(nameBounds.width, nameBounds.height);

	// Center name and set text styles
	name.attr({
		x: nameDimensions.x,
		y: nameDimensions.y,
		dominantBaseline: 'hanging'
	});

	// Create main rectangle
	var rectWidth = 100;
	var rectHeight = nameBounds.height * 1.5;
	var rectDimensions = generateRectDimensions(rectWidth, rectHeight);
	var dashArray = rectDimensions.perimeter / 2;

	var rect = s.rect(rectDimensions.x, rectDimensions.y, rectWidth, rectHeight)
		.attr({
			fill: 'rgba(0, 0, 0, 0)',
			stroke: '#111',
			strokeDasharray: '0 ' + dashArray
		});


	// Draw rectangle
	Snap.animate(0, dashArray, function(value) {
		rect.attr({
			strokeDasharray: value + ' ' + (dashArray - value)
		});
	}, 800, easeInOutCirc, function() {

		// Make rectangle collapse to center
		var centerWidth = 1;
		rectDimensions = generateRectDimensions(centerWidth, rectHeight);
		rect.animate({
			x: rectDimensions.x,
			width: centerWidth
		}, 500, easeInOutCirc, function() {

			// Swipe rectangle to the right
			var rightX = svgWidth - ((svgWidth - nameBounds.x2) / 3);
			rect.animate({
				x: rightX
			}, 500, easeInOutCirc, function() {

				// Create a clone of rectangle for mask for name
				var rectMask = rect.clone();

				rectMask.attr({
					fill: '#fff'
				});

				// Name should mask
				name.attr({
					mask: rectMask,
					visibility: 'visible'
				});

				// Swipe rect and rect mask to the left now
				var finalX = svgWidth / 8;
				Snap.animate(0, 1, function(value) {

					// Move rectangles
					var newRectX = rightX - ((rightX - finalX) * value)
					rect.attr({
						x: newRectX
					});
					rectMask.attr({
						x: newRectX,
						width: '100%'
					});

					// Move text
					var newTextX = nameDimensions.x - ((nameDimensions.x - (finalX + 15)) * value);
					name.attr({
						x: newTextX
					});

				}, 1000, easeInOutCirc);

			});

		});

	});

	function generateRectDimensions(width, height) {
		return {
			x: (svgWidth - width) / 2,
			y: (svgHeight - height) / 2,
			perimeter: (width * 2) + (height * 2)
		};
	}

};
