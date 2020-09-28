System.register(['./b.js'], function (exports) {
	'use strict';
	var b;
	return {
		setters: [function (module) {
			b = module.b;
		}],
		execute: function () {

			exports('a', createCommonjsModule);

			function createCommonjsModule(fn, basedir, module) {
				return module = {
					path: basedir,
					exports: {},
					require: function (path, base) {
						return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
					}
				}, fn(module, module.exports), module.exports;
			}

			function commonjsRequire () {
				throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
			}

			var c = exports('c', createCommonjsModule(function (module, exports) {
			console.log(b);

			Object.defineProperty(exports, "__esModule", { value: true });
			exports.default = "C";
			}));

		}
	};
});
