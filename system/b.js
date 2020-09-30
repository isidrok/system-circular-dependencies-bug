System.register(['./c.js'], function (exports) {
	'use strict';
	var c;
	return {
		setters: [function (module) {
			c = module.c;
		}],
		execute: function () {

			console.log("C", c);

			var b = "B";

			var b$1 = /*#__PURE__*/Object.freeze({
				__proto__: null,
				'default': b
			});
			exports('b', b$1);

		}
	};
});
