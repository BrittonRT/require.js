load.js
=======

A very simple script loader. Handles asynchronous downloads and dependencies in modern browsers.

Scripts are loaded asynchronously in batches and a callback is fired when all scripts have loaded and executed. Execution order is not guarunteed within a batch but loads can be chains via the callbacks to satisfy dependancies. This is never as fast as just including the scripts in the markup directly, but allows you to lazy load scripts on demand.

<pre>
load(
	'Class.js',
	'Node.fragment.js',

	function() {

		load(	
			'Service.js',

			function() {

				load(
					'Node.append.js',
					'Service.Socket.js',
					'Service.Worker.js',

					done
				)

			}
		)

	}
);
function done() {
	console.log('all scripts loaded');
}
</pre>