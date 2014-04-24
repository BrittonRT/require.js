/*
**  require.js
**
**  Dependencies: none
*/
;'use strict';
require = (function(window, document) {
	/* -- VARIABLES -- */
	var loaded = {}, errors = false;
	/* -- RETURN -- */
	return function() {
		var msg = 'Missing required object.',
			src, script,
			completed = 0,
			max,
			callback = function(){};;
		if (typeof arguments[arguments.length-1] == 'function') {
			max      = arguments.length-1,
			callback = arguments[max];
		} else
			max      = arguments.length;
		for (var i=0; i<max; i++) { src = arguments[i];
			msg = 'Missing required object '+src+'.';
			if (loaded[src])
				onload.call({src:src});
			else {
				loaded[src]    = false;
				script         = document.createElement('script');
				script.setAttribute('async', '');
				script.type    = 'text/javascript';
				script.onload  = onload.bind(script);
				script.onerror = onerror.bind(script);
				script.src     = src;
				document.getElementsByTagName('head')[0].appendChild(script);
			}
		}
		function onload() {
			loaded[this.src] = true;
			if (++completed == max) callback(!errors);
		}
		function onerror() {
			errors = true;;
			throw new ReferenceError(msg);
			if (++completed == max) callback(!errors);
		}
	};
})(window, document);
