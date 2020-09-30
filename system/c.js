System.register(['./b.js'], function (exports) {
	'use strict';
	var b;
	return {
		setters: [function (module) {
			b = module.b;
		}],
		execute: function () {

			var c$1 = /*#__PURE__*/Object.freeze({
				__proto__: null,
				get default () { return c; }
			});
			exports('c', c$1);

			console.log("B", b);

			var c = "C";

		}
	};
});
