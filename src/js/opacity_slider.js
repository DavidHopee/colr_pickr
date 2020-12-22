/**
 * Opacity Slider
 */

// Function to handle changes to the opacity slider
picker.opacitySliderHandler = function (position) {
	// Defining the slider and dragger
	const sliderContainer = document.getElementById('opacity_slider');
	const sliderDragger = document.getElementById('opacity_slider_dragger');

	// Defining the X position
	let eventX = position - sliderContainer.getBoundingClientRect().left;

	// Making conditions so that the user don't drag outside the box
	if (eventX < 11) eventX = 11;

	if (eventX > 255) eventX = 255;

	// Update the X property of the dragger
	sliderDragger.attributes.x.nodeValue = eventX;

	// Percentage of the dragger on the X axis
	const percent = ((eventX - 11) / 244) * 100;

	// Finding the value for the percentage of 1
	let alpha = (1 / 100) * percent;

	// Rounding the value to the nearest 2 decimals
	alpha = Number(Math.round(alpha + 'e' + 2) + 'e-' + 2);

	// Updating the data objects
	picker.alpha = alpha;

	// Changing the opacity of the color box and slider
	document.getElementById('color_box').children[1].style.opacity = alpha;
	document.getElementById('color_slider').children[1].style.opacity = alpha;

	// Update the color text values
	picker.updateColorValueInput();

	// Setting the data-color attribute to a color string
	// This is so that the color updates properly on instances where the color has not been set
	picker.instance.element.setAttribute('data-color', 'color');

	// Update
	updatePicker();
};

/**
 * Mouse Events
 */

// Start the slider drag for opacity
document.getElementById('opacity_slider').addEventListener('mousedown', function (event) {
	// Updating the status in the data object
	picker.opacityStatus = true;
	// Calling the handler function
	picker.opacitySliderHandler(event.pageX);
});

// Moving the slider drag for opacity
document.addEventListener('mousemove', function (event) {
	// Checking that the drag has started
	if (picker.opacityStatus === true) {
		// Calling the handler function
		picker.opacitySliderHandler(event.pageX);
	}
});

// End the slider drag
document.addEventListener('mouseup', function () {
	// Checking that the drag has started
	if (picker.opacityStatus === true) {
		// Updating the status in the data object
		picker.opacityStatus = false;
	}
});

/**
 * Touch Events
 */

// Start the slider drag on touch
document.getElementById('opacity_slider').addEventListener(
	'touchstart',
	function (event) {
		// Updating the status
		picker.opacityStatusTouch = true;
		// Calling the handler function
		picker.opacitySliderHandler(event.changedTouches[0].clientX);
	},
	{ passive: true }
);

// Moving the slider drag on touch
document.addEventListener(
	'touchmove',
	function () {
		// Checking that the touch drag has started
		if (picker.opacityStatusTouch === true) {
			// Prevent page scrolling
			event.preventDefault();
			// Calling the handler function
			picker.opacitySliderHandler(event.changedTouches[0].clientX);
		}
	},
	{ passive: false }
);

// End the slider drag on touch
document.addEventListener('touchend', function () {
	// Checking that the touch drag has started
	if (picker.opacityStatusTouch === true) {
		// Updating the status
		picker.opacityStatusTouch = false;
	}
});
