System.register(['./c.js', './b.js'], function (exports) {
	'use strict';
	var c, b;
	return {
		setters: [function (module) {
			c = module.c;
		}, function (module) {
			b = module.b;
		}],
		execute: function () {

			console.log(c);


			console.log(b);

			var a = exports('default', {

			});

		}
	};
});
