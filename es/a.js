import { r as reactDom, b as react } from './react.js';
import './core-js.js';

reactDom.render( /*#__PURE__*/react.createElement("div", null, "A"), document.getElementById('a'));
