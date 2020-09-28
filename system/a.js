System.register(['./react.js', './core-js.js'], function () {
	'use strict';
	var reactDom, react;
	return {
		setters: [function (module) {
			reactDom = module.r;
			react = module.b;
		}, function () {}],
		execute: function () {

			reactDom.render( /*#__PURE__*/react.createElement("div", null, "A"), document.getElementById('a'));

		}
	};
});
