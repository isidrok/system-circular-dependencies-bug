System.register(['./c.js'], function (exports) {
	'use strict';
	var c, createCommonjsModule;
	return {
		setters: [function (module) {
			c = module.c;
			createCommonjsModule = module.a;
		}],
		execute: function () {

			var b = exports('b', createCommonjsModule(function (module, exports) {
			console.log(c);

			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = "B";
			}));

		}
	};
});
