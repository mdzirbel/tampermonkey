// ==UserScript==
// @name         Drawings Scroll
// @namespace    http://tampermonkey.net/
// @description  Zoom in the ctrl+alt++ via control+scroll
// @author       Matthew Zirbel
// @match        https://docs.google.com/*
// ==/UserScript==

(function() {
	// $(window).bind('mousewheel DOMMouseScroll', function (event) {
	// 	if (event.ctrlKey == true) {
	// 		event.preventDefault();

	// 		var keyboardEvent = document.createEvent('KeyboardEvent');
	// 		var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

	// 		keyboardEvent[initMethod](
	// 		  'keydown', // event type: keydown, keyup, keypress
	// 		  true, // bubbles
	// 		  true, // cancelable
	// 		  window, // view: should be window
	// 		  true, // ctrlKey
	// 		  true, // altKey
	// 		  false, // shiftKey
	// 		  false, // metaKey
	// 		  107, // keyCode: unsigned long - the virtual key code, else 0
	// 		  0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
	// 		);
	// 		document.dispatchEvent(keyboardEvent);
	// 	}
	// });

	document.addEventListener('wheel', function(e) {

		if (e.ctrlKey) {
			e.preventDefault()

			// var keyboardEvent = document.createEvent('KeyboardEvent');
			// var initMethod = typeof keyboardEvent.initKeyboardEvent !== 'undefined' ? 'initKeyboardEvent' : 'initKeyEvent';

			// keyboardEvent[initMethod](
			// 	'keypress', // event type: keydown, keyup, keypress
			// 	true, // bubbles
			// 	true, // cancelable
			// 	window, // view: should be window
			// 	true, // ctrlKey
			// 	true, // altKey
			// 	false, // shiftKey
			// 	false, // metaKey
			// 	107, // keyCode: unsigned long - the virtual key code, else 0
			// 	0, // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
			// );
			// document.dispatchEvent(keyboardEvent);

			var press = jQuery.Event("keydown", {
				keyCode: 107,
				which: 107,
				ctrlKey: true,
				altKey: true

			});
			console.log(press)
			// press.ctrlKey = true;
			// press.altKey = true;
			// press.which = 107;
			// press.keyCode = 107;
			jQuery("body").trigger(press);
		}

	}, { passive: false });
})();