/*
**  load.js
**
**  Dependencies: none
*/
;load = (function(window, document) {
	'use strict';
	/* -- VARIABLES -- */
	var loaded = {};
	/* -- RETURN -- */
	return function() {
		var src, script,
			completed = 0,
			max,
			callback;
		if (typeof arguments[arguments.length-1] == 'function') {
			max      = arguments.length-1,
			callback = arguments[max];
		} else {
			max      = arguments.length,
			callback = function(){};
		}
		for (var i=0; i<max; i++) { src = arguments[i];
			if (loaded[src]) return onload.call({src:src});
			loaded[src]   = false;
			script        = document.createElement('script');
			script.setAttribute('async', '');
			script.type   = 'text/javascript';
			script.onload = onload.bind(script);
			script.src    = src;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
		function onload() {
			loaded[this.src] = true;
			if (++completed == max) callback();
		}
	};
})(window, document);
