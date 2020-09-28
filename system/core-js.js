System.register(['./react.js'], function () {
  'use strict';
  var commonjsGlobal, createCommonjsModule;
  return {
    setters: [function (module) {
      commonjsGlobal = module.c;
      createCommonjsModule = module.a;
    }],
    execute: function () {

      var check = function (it) {
        return it && it.Math == Math && it;
      };

      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global_1 =
        // eslint-disable-next-line no-undef
        check(typeof globalThis == 'object' && globalThis) ||
        check(typeof window == 'object' && window) ||
        check(typeof self == 'object' && self) ||
        check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
        // eslint-disable-next-line no-new-func
        Function('return this')();

      var fails = function (exec) {
        try {
          return !!exec();
        } catch (error) {
          return true;
        }
      };

      // Thank's IE8 for his funny defineProperty
      var descriptors = !fails(function () {
        return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
      });

      var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
      var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

      // Nashorn ~ JDK8 bug
      var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

      // `Object.prototype.propertyIsEnumerable` method implementation
      // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
      var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
        var descriptor = getOwnPropertyDescriptor(this, V);
        return !!descriptor && descriptor.enumerable;
      } : nativePropertyIsEnumerable;

      var objectPropertyIsEnumerable = {
      	f: f
      };

      var createPropertyDescriptor = function (bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };

      var toString = {}.toString;

      var classofRaw = function (it) {
        return toString.call(it).slice(8, -1);
      };

      var split = ''.split;

      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      var indexedObject = fails(function () {
        // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
        // eslint-disable-next-line no-prototype-builtins
        return !Object('z').propertyIsEnumerable(0);
      }) ? function (it) {
        return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
      } : Object;

      // `RequireObjectCoercible` abstract operation
      // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
      var requireObjectCoercible = function (it) {
        if (it == undefined) throw TypeError("Can't call method on " + it);
        return it;
      };

      // toObject with fallback for non-array-like ES3 strings



      var toIndexedObject = function (it) {
        return indexedObject(requireObjectCoercible(it));
      };

      var isObject = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };

      // `ToPrimitive` abstract operation
      // https://tc39.github.io/ecma262/#sec-toprimitive
      // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string
      var toPrimitive = function (input, PREFERRED_STRING) {
        if (!isObject(input)) return input;
        var fn, val;
        if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
        if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
        if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
        throw TypeError("Can't convert object to primitive value");
      };

      var hasOwnProperty = {}.hasOwnProperty;

      var has = function (it, key) {
        return hasOwnProperty.call(it, key);
      };

      var document$1 = global_1.document;
      // typeof document.createElement is 'object' in old IE
      var EXISTS = isObject(document$1) && isObject(document$1.createElement);

      var documentCreateElement = function (it) {
        return EXISTS ? document$1.createElement(it) : {};
      };

      // Thank's IE8 for his funny defineProperty
      var ie8DomDefine = !descriptors && !fails(function () {
        return Object.defineProperty(documentCreateElement('div'), 'a', {
          get: function () { return 7; }
        }).a != 7;
      });

      var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
      var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
        O = toIndexedObject(O);
        P = toPrimitive(P, true);
        if (ie8DomDefine) try {
          return nativeGetOwnPropertyDescriptor(O, P);
        } catch (error) { /* empty */ }
        if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
      };

      var objectGetOwnPropertyDescriptor = {
      	f: f$1
      };

      var anObject = function (it) {
        if (!isObject(it)) {
          throw TypeError(String(it) + ' is not an object');
        } return it;
      };

      var nativeDefineProperty = Object.defineProperty;

      // `Object.defineProperty` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperty
      var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (ie8DomDefine) try {
          return nativeDefineProperty(O, P, Attributes);
        } catch (error) { /* empty */ }
        if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };

      var objectDefineProperty = {
      	f: f$2
      };

      var createNonEnumerableProperty = descriptors ? function (object, key, value) {
        return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
      } : function (object, key, value) {
        object[key] = value;
        return object;
      };

      var setGlobal = function (key, value) {
        try {
          createNonEnumerableProperty(global_1, key, value);
        } catch (error) {
          global_1[key] = value;
        } return value;
      };

      var SHARED = '__core-js_shared__';
      var store = global_1[SHARED] || setGlobal(SHARED, {});

      var sharedStore = store;

      var functionToString = Function.toString;

      // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
      if (typeof sharedStore.inspectSource != 'function') {
        sharedStore.inspectSource = function (it) {
          return functionToString.call(it);
        };
      }

      var inspectSource = sharedStore.inspectSource;

      var WeakMap = global_1.WeakMap;

      var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

      var shared = createCommonjsModule(function (module) {
      (module.exports = function (key, value) {
        return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
      })('versions', []).push({
        version: '3.6.5',
        mode:  'global',
        copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
      });
      });

      var id = 0;
      var postfix = Math.random();

      var uid = function (key) {
        return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
      };

      var keys = shared('keys');

      var sharedKey = function (key) {
        return keys[key] || (keys[key] = uid(key));
      };

      var hiddenKeys = {};

      var WeakMap$1 = global_1.WeakMap;
      var set, get, has$1;

      var enforce = function (it) {
        return has$1(it) ? get(it) : set(it, {});
      };

      var getterFor = function (TYPE) {
        return function (it) {
          var state;
          if (!isObject(it) || (state = get(it)).type !== TYPE) {
            throw TypeError('Incompatible receiver, ' + TYPE + ' required');
          } return state;
        };
      };

      if (nativeWeakMap) {
        var store$1 = new WeakMap$1();
        var wmget = store$1.get;
        var wmhas = store$1.has;
        var wmset = store$1.set;
        set = function (it, metadata) {
          wmset.call(store$1, it, metadata);
          return metadata;
        };
        get = function (it) {
          return wmget.call(store$1, it) || {};
        };
        has$1 = function (it) {
          return wmhas.call(store$1, it);
        };
      } else {
        var STATE = sharedKey('state');
        hiddenKeys[STATE] = true;
        set = function (it, metadata) {
          createNonEnumerableProperty(it, STATE, metadata);
          return metadata;
        };
        get = function (it) {
          return has(it, STATE) ? it[STATE] : {};
        };
        has$1 = function (it) {
          return has(it, STATE);
        };
      }

      var internalState = {
        set: set,
        get: get,
        has: has$1,
        enforce: enforce,
        getterFor: getterFor
      };

      var redefine = createCommonjsModule(function (module) {
      var getInternalState = internalState.get;
      var enforceInternalState = internalState.enforce;
      var TEMPLATE = String(String).split('String');

      (module.exports = function (O, key, value, options) {
        var unsafe = options ? !!options.unsafe : false;
        var simple = options ? !!options.enumerable : false;
        var noTargetGet = options ? !!options.noTargetGet : false;
        if (typeof value == 'function') {
          if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
          enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
        }
        if (O === global_1) {
          if (simple) O[key] = value;
          else setGlobal(key, value);
          return;
        } else if (!unsafe) {
          delete O[key];
        } else if (!noTargetGet && O[key]) {
          simple = true;
        }
        if (simple) O[key] = value;
        else createNonEnumerableProperty(O, key, value);
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
      })(Function.prototype, 'toString', function toString() {
        return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
      });
      });

      var path = global_1;

      var aFunction = function (variable) {
        return typeof variable == 'function' ? variable : undefined;
      };

      var getBuiltIn = function (namespace, method) {
        return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
          : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
      };

      var ceil = Math.ceil;
      var floor = Math.floor;

      // `ToInteger` abstract operation
      // https://tc39.github.io/ecma262/#sec-tointeger
      var toInteger = function (argument) {
        return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
      };

      var min = Math.min;

      // `ToLength` abstract operation
      // https://tc39.github.io/ecma262/#sec-tolength
      var toLength = function (argument) {
        return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
      };

      var max = Math.max;
      var min$1 = Math.min;

      // Helper for a popular repeating case of the spec:
      // Let integer be ? ToInteger(index).
      // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
      var toAbsoluteIndex = function (index, length) {
        var integer = toInteger(index);
        return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
      };

      // `Array.prototype.{ indexOf, includes }` methods implementation
      var createMethod = function (IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIndexedObject($this);
          var length = toLength(O.length);
          var index = toAbsoluteIndex(fromIndex, length);
          var value;
          // Array#includes uses SameValueZero equality algorithm
          // eslint-disable-next-line no-self-compare
          if (IS_INCLUDES && el != el) while (length > index) {
            value = O[index++];
            // eslint-disable-next-line no-self-compare
            if (value != value) return true;
          // Array#indexOf ignores holes, Array#includes - not
          } else for (;length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
          } return !IS_INCLUDES && -1;
        };
      };

      var arrayIncludes = {
        // `Array.prototype.includes` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.includes
        includes: createMethod(true),
        // `Array.prototype.indexOf` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
        indexOf: createMethod(false)
      };

      var indexOf = arrayIncludes.indexOf;


      var objectKeysInternal = function (object, names) {
        var O = toIndexedObject(object);
        var i = 0;
        var result = [];
        var key;
        for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
        // Don't enum bug & hidden keys
        while (names.length > i) if (has(O, key = names[i++])) {
          ~indexOf(result, key) || result.push(key);
        }
        return result;
      };

      // IE8- don't enum bug keys
      var enumBugKeys = [
        'constructor',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'toLocaleString',
        'toString',
        'valueOf'
      ];

      var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

      // `Object.getOwnPropertyNames` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
      var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return objectKeysInternal(O, hiddenKeys$1);
      };

      var objectGetOwnPropertyNames = {
      	f: f$3
      };

      var f$4 = Object.getOwnPropertySymbols;

      var objectGetOwnPropertySymbols = {
      	f: f$4
      };

      // all object keys, includes non-enumerable and symbols
      var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
        var keys = objectGetOwnPropertyNames.f(anObject(it));
        var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
        return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
      };

      var copyConstructorProperties = function (target, source) {
        var keys = ownKeys(source);
        var defineProperty = objectDefineProperty.f;
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
        }
      };

      var replacement = /#|\.prototype\./;

      var isForced = function (feature, detection) {
        var value = data[normalize(feature)];
        return value == POLYFILL ? true
          : value == NATIVE ? false
          : typeof detection == 'function' ? fails(detection)
          : !!detection;
      };

      var normalize = isForced.normalize = function (string) {
        return String(string).replace(replacement, '.').toLowerCase();
      };

      var data = isForced.data = {};
      var NATIVE = isForced.NATIVE = 'N';
      var POLYFILL = isForced.POLYFILL = 'P';

      var isForced_1 = isForced;

      var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






      /*
        options.target      - name of the target object
        options.global      - target is the global object
        options.stat        - export as static methods of target
        options.proto       - export as prototype methods of target
        options.real        - real prototype method for the `pure` version
        options.forced      - export even if the native feature is available
        options.bind        - bind methods to the target, required for the `pure` version
        options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
        options.unsafe      - use the simple assignment of property instead of delete + defineProperty
        options.sham        - add a flag to not completely full polyfills
        options.enumerable  - export as enumerable property
        options.noTargetGet - prevent calling a getter on target
      */
      var _export = function (options, source) {
        var TARGET = options.target;
        var GLOBAL = options.global;
        var STATIC = options.stat;
        var FORCED, target, key, targetProperty, sourceProperty, descriptor;
        if (GLOBAL) {
          target = global_1;
        } else if (STATIC) {
          target = global_1[TARGET] || setGlobal(TARGET, {});
        } else {
          target = (global_1[TARGET] || {}).prototype;
        }
        if (target) for (key in source) {
          sourceProperty = source[key];
          if (options.noTargetGet) {
            descriptor = getOwnPropertyDescriptor$1(target, key);
            targetProperty = descriptor && descriptor.value;
          } else targetProperty = target[key];
          FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
          // contained in target
          if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty === typeof targetProperty) continue;
            copyConstructorProperties(sourceProperty, targetProperty);
          }
          // add a flag to not completely full polyfills
          if (options.sham || (targetProperty && targetProperty.sham)) {
            createNonEnumerableProperty(sourceProperty, 'sham', true);
          }
          // extend global
          redefine(target, key, sourceProperty, options);
        }
      };

      var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
        // Chrome 38 Symbol has incorrect toString conversion
        // eslint-disable-next-line no-undef
        return !String(Symbol());
      });

      var useSymbolAsUid = nativeSymbol
        // eslint-disable-next-line no-undef
        && !Symbol.sham
        // eslint-disable-next-line no-undef
        && typeof Symbol.iterator == 'symbol';

      // `IsArray` abstract operation
      // https://tc39.github.io/ecma262/#sec-isarray
      var isArray = Array.isArray || function isArray(arg) {
        return classofRaw(arg) == 'Array';
      };

      // `ToObject` abstract operation
      // https://tc39.github.io/ecma262/#sec-toobject
      var toObject = function (argument) {
        return Object(requireObjectCoercible(argument));
      };

      // `Object.keys` method
      // https://tc39.github.io/ecma262/#sec-object.keys
      var objectKeys = Object.keys || function keys(O) {
        return objectKeysInternal(O, enumBugKeys);
      };

      // `Object.defineProperties` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperties
      var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = objectKeys(Properties);
        var length = keys.length;
        var index = 0;
        var key;
        while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
        return O;
      };

      var html = getBuiltIn('document', 'documentElement');

      var GT = '>';
      var LT = '<';
      var PROTOTYPE = 'prototype';
      var SCRIPT = 'script';
      var IE_PROTO = sharedKey('IE_PROTO');

      var EmptyConstructor = function () { /* empty */ };

      var scriptTag = function (content) {
        return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
      };

      // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
      var NullProtoObjectViaActiveX = function (activeXDocument) {
        activeXDocument.write(scriptTag(''));
        activeXDocument.close();
        var temp = activeXDocument.parentWindow.Object;
        activeXDocument = null; // avoid memory leak
        return temp;
      };

      // Create object with fake `null` prototype: use iframe Object with cleared prototype
      var NullProtoObjectViaIFrame = function () {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = documentCreateElement('iframe');
        var JS = 'java' + SCRIPT + ':';
        var iframeDocument;
        iframe.style.display = 'none';
        html.appendChild(iframe);
        // https://github.com/zloirock/core-js/issues/475
        iframe.src = String(JS);
        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(scriptTag('document.F=Object'));
        iframeDocument.close();
        return iframeDocument.F;
      };

      // Check for document.domain and active x support
      // No need to use active x approach when document.domain is not set
      // see https://github.com/es-shims/es5-shim/issues/150
      // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
      // avoid IE GC bug
      var activeXDocument;
      var NullProtoObject = function () {
        try {
          /* global ActiveXObject */
          activeXDocument = document.domain && new ActiveXObject('htmlfile');
        } catch (error) { /* ignore */ }
        NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
        var length = enumBugKeys.length;
        while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
        return NullProtoObject();
      };

      hiddenKeys[IE_PROTO] = true;

      // `Object.create` method
      // https://tc39.github.io/ecma262/#sec-object.create
      var objectCreate = Object.create || function create(O, Properties) {
        var result;
        if (O !== null) {
          EmptyConstructor[PROTOTYPE] = anObject(O);
          result = new EmptyConstructor();
          EmptyConstructor[PROTOTYPE] = null;
          // add "__proto__" for Object.getPrototypeOf polyfill
          result[IE_PROTO] = O;
        } else result = NullProtoObject();
        return Properties === undefined ? result : objectDefineProperties(result, Properties);
      };

      var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

      var toString$1 = {}.toString;

      var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
        ? Object.getOwnPropertyNames(window) : [];

      var getWindowNames = function (it) {
        try {
          return nativeGetOwnPropertyNames(it);
        } catch (error) {
          return windowNames.slice();
        }
      };

      // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
      var f$5 = function getOwnPropertyNames(it) {
        return windowNames && toString$1.call(it) == '[object Window]'
          ? getWindowNames(it)
          : nativeGetOwnPropertyNames(toIndexedObject(it));
      };

      var objectGetOwnPropertyNamesExternal = {
      	f: f$5
      };

      var WellKnownSymbolsStore = shared('wks');
      var Symbol$1 = global_1.Symbol;
      var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

      var wellKnownSymbol = function (name) {
        if (!has(WellKnownSymbolsStore, name)) {
          if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
          else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
        } return WellKnownSymbolsStore[name];
      };

      var f$6 = wellKnownSymbol;

      var wellKnownSymbolWrapped = {
      	f: f$6
      };

      var defineProperty = objectDefineProperty.f;

      var defineWellKnownSymbol = function (NAME) {
        var Symbol = path.Symbol || (path.Symbol = {});
        if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
          value: wellKnownSymbolWrapped.f(NAME)
        });
      };

      var defineProperty$1 = objectDefineProperty.f;



      var TO_STRING_TAG = wellKnownSymbol('toStringTag');

      var setToStringTag = function (it, TAG, STATIC) {
        if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
          defineProperty$1(it, TO_STRING_TAG, { configurable: true, value: TAG });
        }
      };

      var aFunction$1 = function (it) {
        if (typeof it != 'function') {
          throw TypeError(String(it) + ' is not a function');
        } return it;
      };

      // optional / simple context binding
      var functionBindContext = function (fn, that, length) {
        aFunction$1(fn);
        if (that === undefined) return fn;
        switch (length) {
          case 0: return function () {
            return fn.call(that);
          };
          case 1: return function (a) {
            return fn.call(that, a);
          };
          case 2: return function (a, b) {
            return fn.call(that, a, b);
          };
          case 3: return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
        }
        return function (/* ...args */) {
          return fn.apply(that, arguments);
        };
      };

      var SPECIES = wellKnownSymbol('species');

      // `ArraySpeciesCreate` abstract operation
      // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
      var arraySpeciesCreate = function (originalArray, length) {
        var C;
        if (isArray(originalArray)) {
          C = originalArray.constructor;
          // cross-realm fallback
          if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
          else if (isObject(C)) {
            C = C[SPECIES];
            if (C === null) C = undefined;
          }
        } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
      };

      var push = [].push;

      // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
      var createMethod$1 = function (TYPE) {
        var IS_MAP = TYPE == 1;
        var IS_FILTER = TYPE == 2;
        var IS_SOME = TYPE == 3;
        var IS_EVERY = TYPE == 4;
        var IS_FIND_INDEX = TYPE == 6;
        var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
        return function ($this, callbackfn, that, specificCreate) {
          var O = toObject($this);
          var self = indexedObject(O);
          var boundFunction = functionBindContext(callbackfn, that, 3);
          var length = toLength(self.length);
          var index = 0;
          var create = specificCreate || arraySpeciesCreate;
          var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
          var value, result;
          for (;length > index; index++) if (NO_HOLES || index in self) {
            value = self[index];
            result = boundFunction(value, index, O);
            if (TYPE) {
              if (IS_MAP) target[index] = result; // map
              else if (result) switch (TYPE) {
                case 3: return true;              // some
                case 5: return value;             // find
                case 6: return index;             // findIndex
                case 2: push.call(target, value); // filter
              } else if (IS_EVERY) return false;  // every
            }
          }
          return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
        };
      };

      var arrayIteration = {
        // `Array.prototype.forEach` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
        forEach: createMethod$1(0),
        // `Array.prototype.map` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.map
        map: createMethod$1(1),
        // `Array.prototype.filter` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.filter
        filter: createMethod$1(2),
        // `Array.prototype.some` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.some
        some: createMethod$1(3),
        // `Array.prototype.every` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.every
        every: createMethod$1(4),
        // `Array.prototype.find` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.find
        find: createMethod$1(5),
        // `Array.prototype.findIndex` method
        // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
        findIndex: createMethod$1(6)
      };

      var $forEach = arrayIteration.forEach;

      var HIDDEN = sharedKey('hidden');
      var SYMBOL = 'Symbol';
      var PROTOTYPE$1 = 'prototype';
      var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
      var setInternalState = internalState.set;
      var getInternalState = internalState.getterFor(SYMBOL);
      var ObjectPrototype = Object[PROTOTYPE$1];
      var $Symbol = global_1.Symbol;
      var $stringify = getBuiltIn('JSON', 'stringify');
      var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
      var nativeDefineProperty$1 = objectDefineProperty.f;
      var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
      var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
      var AllSymbols = shared('symbols');
      var ObjectPrototypeSymbols = shared('op-symbols');
      var StringToSymbolRegistry = shared('string-to-symbol-registry');
      var SymbolToStringRegistry = shared('symbol-to-string-registry');
      var WellKnownSymbolsStore$1 = shared('wks');
      var QObject = global_1.QObject;
      // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
      var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

      // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
      var setSymbolDescriptor = descriptors && fails(function () {
        return objectCreate(nativeDefineProperty$1({}, 'a', {
          get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
        })).a != 7;
      }) ? function (O, P, Attributes) {
        var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
        if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
        nativeDefineProperty$1(O, P, Attributes);
        if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
          nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
        }
      } : nativeDefineProperty$1;

      var wrap = function (tag, description) {
        var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
        setInternalState(symbol, {
          type: SYMBOL,
          tag: tag,
          description: description
        });
        if (!descriptors) symbol.description = description;
        return symbol;
      };

      var isSymbol = useSymbolAsUid ? function (it) {
        return typeof it == 'symbol';
      } : function (it) {
        return Object(it) instanceof $Symbol;
      };

      var $defineProperty = function defineProperty(O, P, Attributes) {
        if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
        anObject(O);
        var key = toPrimitive(P, true);
        anObject(Attributes);
        if (has(AllSymbols, key)) {
          if (!Attributes.enumerable) {
            if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
            O[HIDDEN][key] = true;
          } else {
            if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
            Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
          } return setSymbolDescriptor(O, key, Attributes);
        } return nativeDefineProperty$1(O, key, Attributes);
      };

      var $defineProperties = function defineProperties(O, Properties) {
        anObject(O);
        var properties = toIndexedObject(Properties);
        var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
        $forEach(keys, function (key) {
          if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
        });
        return O;
      };

      var $create = function create(O, Properties) {
        return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
      };

      var $propertyIsEnumerable = function propertyIsEnumerable(V) {
        var P = toPrimitive(V, true);
        var enumerable = nativePropertyIsEnumerable$1.call(this, P);
        if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
        return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
      };

      var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
        var it = toIndexedObject(O);
        var key = toPrimitive(P, true);
        if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
        var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
        if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
          descriptor.enumerable = true;
        }
        return descriptor;
      };

      var $getOwnPropertyNames = function getOwnPropertyNames(O) {
        var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
        var result = [];
        $forEach(names, function (key) {
          if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
        });
        return result;
      };

      var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
        var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
        var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
        var result = [];
        $forEach(names, function (key) {
          if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
            result.push(AllSymbols[key]);
          }
        });
        return result;
      };

      // `Symbol` constructor
      // https://tc39.github.io/ecma262/#sec-symbol-constructor
      if (!nativeSymbol) {
        $Symbol = function Symbol() {
          if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
          var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
          var tag = uid(description);
          var setter = function (value) {
            if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
            if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
            setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
          };
          if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
          return wrap(tag, description);
        };

        redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
          return getInternalState(this).tag;
        });

        redefine($Symbol, 'withoutSetter', function (description) {
          return wrap(uid(description), description);
        });

        objectPropertyIsEnumerable.f = $propertyIsEnumerable;
        objectDefineProperty.f = $defineProperty;
        objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
        objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
        objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

        wellKnownSymbolWrapped.f = function (name) {
          return wrap(wellKnownSymbol(name), name);
        };

        if (descriptors) {
          // https://github.com/tc39/proposal-Symbol-description
          nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
            configurable: true,
            get: function description() {
              return getInternalState(this).description;
            }
          });
          {
            redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
          }
        }
      }

      _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
        Symbol: $Symbol
      });

      $forEach(objectKeys(WellKnownSymbolsStore$1), function (name) {
        defineWellKnownSymbol(name);
      });

      _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
        // `Symbol.for` method
        // https://tc39.github.io/ecma262/#sec-symbol.for
        'for': function (key) {
          var string = String(key);
          if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
          var symbol = $Symbol(string);
          StringToSymbolRegistry[string] = symbol;
          SymbolToStringRegistry[symbol] = string;
          return symbol;
        },
        // `Symbol.keyFor` method
        // https://tc39.github.io/ecma262/#sec-symbol.keyfor
        keyFor: function keyFor(sym) {
          if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
          if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
        },
        useSetter: function () { USE_SETTER = true; },
        useSimple: function () { USE_SETTER = false; }
      });

      _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
        // `Object.create` method
        // https://tc39.github.io/ecma262/#sec-object.create
        create: $create,
        // `Object.defineProperty` method
        // https://tc39.github.io/ecma262/#sec-object.defineproperty
        defineProperty: $defineProperty,
        // `Object.defineProperties` method
        // https://tc39.github.io/ecma262/#sec-object.defineproperties
        defineProperties: $defineProperties,
        // `Object.getOwnPropertyDescriptor` method
        // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor
      });

      _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
        // `Object.getOwnPropertyNames` method
        // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
        getOwnPropertyNames: $getOwnPropertyNames,
        // `Object.getOwnPropertySymbols` method
        // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
        getOwnPropertySymbols: $getOwnPropertySymbols
      });

      // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
      // https://bugs.chromium.org/p/v8/issues/detail?id=3443
      _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
        getOwnPropertySymbols: function getOwnPropertySymbols(it) {
          return objectGetOwnPropertySymbols.f(toObject(it));
        }
      });

      // `JSON.stringify` method behavior with symbols
      // https://tc39.github.io/ecma262/#sec-json.stringify
      if ($stringify) {
        var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
          var symbol = $Symbol();
          // MS Edge converts symbol values to JSON as {}
          return $stringify([symbol]) != '[null]'
            // WebKit converts symbol values to JSON as null
            || $stringify({ a: symbol }) != '{}'
            // V8 throws on boxed symbols
            || $stringify(Object(symbol)) != '{}';
        });

        _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
          // eslint-disable-next-line no-unused-vars
          stringify: function stringify(it, replacer, space) {
            var args = [it];
            var index = 1;
            var $replacer;
            while (arguments.length > index) args.push(arguments[index++]);
            $replacer = replacer;
            if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
            if (!isArray(replacer)) replacer = function (key, value) {
              if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
              if (!isSymbol(value)) return value;
            };
            args[1] = replacer;
            return $stringify.apply(null, args);
          }
        });
      }

      // `Symbol.prototype[@@toPrimitive]` method
      // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
      if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
        createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
      }
      // `Symbol.prototype[@@toStringTag]` property
      // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
      setToStringTag($Symbol, SYMBOL);

      hiddenKeys[HIDDEN] = true;

      var defineProperty$2 = objectDefineProperty.f;


      var NativeSymbol = global_1.Symbol;

      if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
        // Safari 12 bug
        NativeSymbol().description !== undefined
      )) {
        var EmptyStringDescriptionStore = {};
        // wrap Symbol constructor for correct work with undefined description
        var SymbolWrapper = function Symbol() {
          var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
          var result = this instanceof SymbolWrapper
            ? new NativeSymbol(description)
            // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
            : description === undefined ? NativeSymbol() : NativeSymbol(description);
          if (description === '') EmptyStringDescriptionStore[result] = true;
          return result;
        };
        copyConstructorProperties(SymbolWrapper, NativeSymbol);
        var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
        symbolPrototype.constructor = SymbolWrapper;

        var symbolToString = symbolPrototype.toString;
        var native = String(NativeSymbol('test')) == 'Symbol(test)';
        var regexp = /^Symbol\((.*)\)[^)]+$/;
        defineProperty$2(symbolPrototype, 'description', {
          configurable: true,
          get: function description() {
            var symbol = isObject(this) ? this.valueOf() : this;
            var string = symbolToString.call(symbol);
            if (has(EmptyStringDescriptionStore, symbol)) return '';
            var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
            return desc === '' ? undefined : desc;
          }
        });

        _export({ global: true, forced: true }, {
          Symbol: SymbolWrapper
        });
      }

      // `Symbol.iterator` well-known symbol
      // https://tc39.github.io/ecma262/#sec-symbol.iterator
      defineWellKnownSymbol('iterator');

      var UNSCOPABLES = wellKnownSymbol('unscopables');
      var ArrayPrototype = Array.prototype;

      // Array.prototype[@@unscopables]
      // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
      if (ArrayPrototype[UNSCOPABLES] == undefined) {
        objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
          configurable: true,
          value: objectCreate(null)
        });
      }

      // add a key to Array.prototype[@@unscopables]
      var addToUnscopables = function (key) {
        ArrayPrototype[UNSCOPABLES][key] = true;
      };

      var iterators = {};

      var correctPrototypeGetter = !fails(function () {
        function F() { /* empty */ }
        F.prototype.constructor = null;
        return Object.getPrototypeOf(new F()) !== F.prototype;
      });

      var IE_PROTO$1 = sharedKey('IE_PROTO');
      var ObjectPrototype$1 = Object.prototype;

      // `Object.getPrototypeOf` method
      // https://tc39.github.io/ecma262/#sec-object.getprototypeof
      var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
        O = toObject(O);
        if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        } return O instanceof Object ? ObjectPrototype$1 : null;
      };

      var ITERATOR = wellKnownSymbol('iterator');
      var BUGGY_SAFARI_ITERATORS = false;

      var returnThis = function () { return this; };

      // `%IteratorPrototype%` object
      // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
      var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

      if ([].keys) {
        arrayIterator = [].keys();
        // Safari 8 has buggy iterators w/o `next`
        if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
        else {
          PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
          if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
        }
      }

      if (IteratorPrototype == undefined) IteratorPrototype = {};

      // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
      if ( !has(IteratorPrototype, ITERATOR)) {
        createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
      }

      var iteratorsCore = {
        IteratorPrototype: IteratorPrototype,
        BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
      };

      var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





      var returnThis$1 = function () { return this; };

      var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
        var TO_STRING_TAG = NAME + ' Iterator';
        IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
        setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
        iterators[TO_STRING_TAG] = returnThis$1;
        return IteratorConstructor;
      };

      var aPossiblePrototype = function (it) {
        if (!isObject(it) && it !== null) {
          throw TypeError("Can't set " + String(it) + ' as a prototype');
        } return it;
      };

      // `Object.setPrototypeOf` method
      // https://tc39.github.io/ecma262/#sec-object.setprototypeof
      // Works with __proto__ only. Old v8 can't work with null proto objects.
      /* eslint-disable no-proto */
      var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
        var CORRECT_SETTER = false;
        var test = {};
        var setter;
        try {
          setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
          setter.call(test, []);
          CORRECT_SETTER = test instanceof Array;
        } catch (error) { /* empty */ }
        return function setPrototypeOf(O, proto) {
          anObject(O);
          aPossiblePrototype(proto);
          if (CORRECT_SETTER) setter.call(O, proto);
          else O.__proto__ = proto;
          return O;
        };
      }() : undefined);

      var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
      var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
      var ITERATOR$1 = wellKnownSymbol('iterator');
      var KEYS = 'keys';
      var VALUES = 'values';
      var ENTRIES = 'entries';

      var returnThis$2 = function () { return this; };

      var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
        createIteratorConstructor(IteratorConstructor, NAME, next);

        var getIterationMethod = function (KIND) {
          if (KIND === DEFAULT && defaultIterator) return defaultIterator;
          if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
          switch (KIND) {
            case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
            case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
            case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
          } return function () { return new IteratorConstructor(this); };
        };

        var TO_STRING_TAG = NAME + ' Iterator';
        var INCORRECT_VALUES_NAME = false;
        var IterablePrototype = Iterable.prototype;
        var nativeIterator = IterablePrototype[ITERATOR$1]
          || IterablePrototype['@@iterator']
          || DEFAULT && IterablePrototype[DEFAULT];
        var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
        var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
        var CurrentIteratorPrototype, methods, KEY;

        // fix native
        if (anyNativeIterator) {
          CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
          if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
            if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
              if (objectSetPrototypeOf) {
                objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
              } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
                createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
              }
            }
            // Set @@toStringTag to native iterators
            setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
          }
        }

        // fix Array#{values, @@iterator}.name in V8 / FF
        if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
          INCORRECT_VALUES_NAME = true;
          defaultIterator = function values() { return nativeIterator.call(this); };
        }

        // define iterator
        if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
          createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
        }
        iterators[NAME] = defaultIterator;

        // export additional methods
        if (DEFAULT) {
          methods = {
            values: getIterationMethod(VALUES),
            keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
            entries: getIterationMethod(ENTRIES)
          };
          if (FORCED) for (KEY in methods) {
            if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
              redefine(IterablePrototype, KEY, methods[KEY]);
            }
          } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
        }

        return methods;
      };

      var ARRAY_ITERATOR = 'Array Iterator';
      var setInternalState$1 = internalState.set;
      var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

      // `Array.prototype.entries` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.entries
      // `Array.prototype.keys` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.keys
      // `Array.prototype.values` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.values
      // `Array.prototype[@@iterator]` method
      // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
      // `CreateArrayIterator` internal method
      // https://tc39.github.io/ecma262/#sec-createarrayiterator
      var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
        setInternalState$1(this, {
          type: ARRAY_ITERATOR,
          target: toIndexedObject(iterated), // target
          index: 0,                          // next index
          kind: kind                         // kind
        });
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
      }, function () {
        var state = getInternalState$1(this);
        var target = state.target;
        var kind = state.kind;
        var index = state.index++;
        if (!target || index >= target.length) {
          state.target = undefined;
          return { value: undefined, done: true };
        }
        if (kind == 'keys') return { value: index, done: false };
        if (kind == 'values') return { value: target[index], done: false };
        return { value: [index, target[index]], done: false };
      }, 'values');

      // argumentsList[@@iterator] is %ArrayProto_values%
      // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
      // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
      iterators.Arguments = iterators.Array;

      // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
      addToUnscopables('keys');
      addToUnscopables('values');
      addToUnscopables('entries');

      var arrayMethodIsStrict = function (METHOD_NAME, argument) {
        var method = [][METHOD_NAME];
        return !!method && fails(function () {
          // eslint-disable-next-line no-useless-call,no-throw-literal
          method.call(null, argument || function () { throw 1; }, 1);
        });
      };

      var nativeJoin = [].join;

      var ES3_STRINGS = indexedObject != Object;
      var STRICT_METHOD = arrayMethodIsStrict('join', ',');

      // `Array.prototype.join` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.join
      _export({ target: 'Array', proto: true, forced: ES3_STRINGS || !STRICT_METHOD }, {
        join: function join(separator) {
          return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
        }
      });

      var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

      // `Object.keys` method
      // https://tc39.github.io/ecma262/#sec-object.keys
      _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
        keys: function keys(it) {
          return objectKeys(toObject(it));
        }
      });

      var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
      var test = {};

      test[TO_STRING_TAG$1] = 'z';

      var toStringTagSupport = String(test) === '[object z]';

      var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
      // ES3 wrong here
      var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

      // fallback for IE11 Script Access Denied error
      var tryGet = function (it, key) {
        try {
          return it[key];
        } catch (error) { /* empty */ }
      };

      // getting tag from ES6+ `Object.prototype.toString`
      var classof = toStringTagSupport ? classofRaw : function (it) {
        var O, tag, result;
        return it === undefined ? 'Undefined' : it === null ? 'Null'
          // @@toStringTag case
          : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
          // builtinTag case
          : CORRECT_ARGUMENTS ? classofRaw(O)
          // ES3 arguments fallback
          : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
      };

      // `Object.prototype.toString` method implementation
      // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
      var objectToString = toStringTagSupport ? {}.toString : function toString() {
        return '[object ' + classof(this) + ']';
      };

      // `Object.prototype.toString` method
      // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
      if (!toStringTagSupport) {
        redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
      }

      // `RegExp.prototype.flags` getter implementation
      // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
      var regexpFlags = function () {
        var that = anObject(this);
        var result = '';
        if (that.global) result += 'g';
        if (that.ignoreCase) result += 'i';
        if (that.multiline) result += 'm';
        if (that.dotAll) result += 's';
        if (that.unicode) result += 'u';
        if (that.sticky) result += 'y';
        return result;
      };

      // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
      // so we use an intermediate function.
      function RE(s, f) {
        return RegExp(s, f);
      }

      var UNSUPPORTED_Y = fails(function () {
        // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
        var re = RE('a', 'y');
        re.lastIndex = 2;
        return re.exec('abcd') != null;
      });

      var BROKEN_CARET = fails(function () {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
        var re = RE('^r', 'gy');
        re.lastIndex = 2;
        return re.exec('str') != null;
      });

      var regexpStickyHelpers = {
      	UNSUPPORTED_Y: UNSUPPORTED_Y,
      	BROKEN_CARET: BROKEN_CARET
      };

      var nativeExec = RegExp.prototype.exec;
      // This always refers to the native implementation, because the
      // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
      // which loads this file before patching the method.
      var nativeReplace = String.prototype.replace;

      var patchedExec = nativeExec;

      var UPDATES_LAST_INDEX_WRONG = (function () {
        var re1 = /a/;
        var re2 = /b*/g;
        nativeExec.call(re1, 'a');
        nativeExec.call(re2, 'a');
        return re1.lastIndex !== 0 || re2.lastIndex !== 0;
      })();

      var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

      // nonparticipating capturing group, copied from es5-shim's String#split patch.
      var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

      var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

      if (PATCH) {
        patchedExec = function exec(str) {
          var re = this;
          var lastIndex, reCopy, match, i;
          var sticky = UNSUPPORTED_Y$1 && re.sticky;
          var flags = regexpFlags.call(re);
          var source = re.source;
          var charsAdded = 0;
          var strCopy = str;

          if (sticky) {
            flags = flags.replace('y', '');
            if (flags.indexOf('g') === -1) {
              flags += 'g';
            }

            strCopy = String(str).slice(re.lastIndex);
            // Support anchored sticky behavior.
            if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
              source = '(?: ' + source + ')';
              strCopy = ' ' + strCopy;
              charsAdded++;
            }
            // ^(? + rx + ) is needed, in combination with some str slicing, to
            // simulate the 'y' flag.
            reCopy = new RegExp('^(?:' + source + ')', flags);
          }

          if (NPCG_INCLUDED) {
            reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
          }
          if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

          match = nativeExec.call(sticky ? reCopy : re, strCopy);

          if (sticky) {
            if (match) {
              match.input = match.input.slice(charsAdded);
              match[0] = match[0].slice(charsAdded);
              match.index = re.lastIndex;
              re.lastIndex += match[0].length;
            } else re.lastIndex = 0;
          } else if (UPDATES_LAST_INDEX_WRONG && match) {
            re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
          }
          if (NPCG_INCLUDED && match && match.length > 1) {
            // Fix browsers whose `exec` methods don't consistently return `undefined`
            // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
            nativeReplace.call(match[0], reCopy, function () {
              for (i = 1; i < arguments.length - 2; i++) {
                if (arguments[i] === undefined) match[i] = undefined;
              }
            });
          }

          return match;
        };
      }

      var regexpExec = patchedExec;

      _export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
        exec: regexpExec
      });

      var TO_STRING = 'toString';
      var RegExpPrototype = RegExp.prototype;
      var nativeToString = RegExpPrototype[TO_STRING];

      var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
      // FF44- RegExp#toString has a wrong name
      var INCORRECT_NAME = nativeToString.name != TO_STRING;

      // `RegExp.prototype.toString` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
      if (NOT_GENERIC || INCORRECT_NAME) {
        redefine(RegExp.prototype, TO_STRING, function toString() {
          var R = anObject(this);
          var p = String(R.source);
          var rf = R.flags;
          var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
          return '/' + p + '/' + f;
        }, { unsafe: true });
      }

      // `String.prototype.{ codePointAt, at }` methods implementation
      var createMethod$2 = function (CONVERT_TO_STRING) {
        return function ($this, pos) {
          var S = String(requireObjectCoercible($this));
          var position = toInteger(pos);
          var size = S.length;
          var first, second;
          if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
          first = S.charCodeAt(position);
          return first < 0xD800 || first > 0xDBFF || position + 1 === size
            || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
              ? CONVERT_TO_STRING ? S.charAt(position) : first
              : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
        };
      };

      var stringMultibyte = {
        // `String.prototype.codePointAt` method
        // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
        codeAt: createMethod$2(false),
        // `String.prototype.at` method
        // https://github.com/mathiasbynens/String.prototype.at
        charAt: createMethod$2(true)
      };

      var charAt = stringMultibyte.charAt;



      var STRING_ITERATOR = 'String Iterator';
      var setInternalState$2 = internalState.set;
      var getInternalState$2 = internalState.getterFor(STRING_ITERATOR);

      // `String.prototype[@@iterator]` method
      // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
      defineIterator(String, 'String', function (iterated) {
        setInternalState$2(this, {
          type: STRING_ITERATOR,
          string: String(iterated),
          index: 0
        });
      // `%StringIteratorPrototype%.next` method
      // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
      }, function next() {
        var state = getInternalState$2(this);
        var string = state.string;
        var index = state.index;
        var point;
        if (index >= string.length) return { value: undefined, done: true };
        point = charAt(string, index);
        state.index += point.length;
        return { value: point, done: false };
      });

      // TODO: Remove from `core-js@4` since it's moved to entry points







      var SPECIES$1 = wellKnownSymbol('species');

      var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
        // #replace needs built-in support for named groups.
        // #match works fine because it just return the exec results, even if it has
        // a "grops" property.
        var re = /./;
        re.exec = function () {
          var result = [];
          result.groups = { a: '7' };
          return result;
        };
        return ''.replace(re, '$<a>') !== '7';
      });

      // IE <= 11 replaces $0 with the whole match, as if it was $&
      // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
      var REPLACE_KEEPS_$0 = (function () {
        return 'a'.replace(/./, '$0') === '$0';
      })();

      var REPLACE = wellKnownSymbol('replace');
      // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
      var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
        if (/./[REPLACE]) {
          return /./[REPLACE]('a', '$0') === '';
        }
        return false;
      })();

      // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
      // Weex JS has frozen built-in prototypes, so use try / catch wrapper
      var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
        var re = /(?:)/;
        var originalExec = re.exec;
        re.exec = function () { return originalExec.apply(this, arguments); };
        var result = 'ab'.split(re);
        return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
      });

      var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
        var SYMBOL = wellKnownSymbol(KEY);

        var DELEGATES_TO_SYMBOL = !fails(function () {
          // String methods call symbol-named RegEp methods
          var O = {};
          O[SYMBOL] = function () { return 7; };
          return ''[KEY](O) != 7;
        });

        var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
          // Symbol-named RegExp methods call .exec
          var execCalled = false;
          var re = /a/;

          if (KEY === 'split') {
            // We can't use real regex here since it causes deoptimization
            // and serious performance degradation in V8
            // https://github.com/zloirock/core-js/issues/306
            re = {};
            // RegExp[@@split] doesn't call the regex's exec method, but first creates
            // a new one. We need to return the patched regex when creating the new one.
            re.constructor = {};
            re.constructor[SPECIES$1] = function () { return re; };
            re.flags = '';
            re[SYMBOL] = /./[SYMBOL];
          }

          re.exec = function () { execCalled = true; return null; };

          re[SYMBOL]('');
          return !execCalled;
        });

        if (
          !DELEGATES_TO_SYMBOL ||
          !DELEGATES_TO_EXEC ||
          (KEY === 'replace' && !(
            REPLACE_SUPPORTS_NAMED_GROUPS &&
            REPLACE_KEEPS_$0 &&
            !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
          )) ||
          (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
        ) {
          var nativeRegExpMethod = /./[SYMBOL];
          var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
            if (regexp.exec === regexpExec) {
              if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
                // The native String method already delegates to @@method (this
                // polyfilled function), leasing to infinite recursion.
                // We avoid it by directly calling the native @@method method.
                return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
              }
              return { done: true, value: nativeMethod.call(str, regexp, arg2) };
            }
            return { done: false };
          }, {
            REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
            REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
          });
          var stringMethod = methods[0];
          var regexMethod = methods[1];

          redefine(String.prototype, KEY, stringMethod);
          redefine(RegExp.prototype, SYMBOL, length == 2
            // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
            // 21.2.5.11 RegExp.prototype[@@split](string, limit)
            ? function (string, arg) { return regexMethod.call(string, this, arg); }
            // 21.2.5.6 RegExp.prototype[@@match](string)
            // 21.2.5.9 RegExp.prototype[@@search](string)
            : function (string) { return regexMethod.call(string, this); }
          );
        }

        if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
      };

      var charAt$1 = stringMultibyte.charAt;

      // `AdvanceStringIndex` abstract operation
      // https://tc39.github.io/ecma262/#sec-advancestringindex
      var advanceStringIndex = function (S, index, unicode) {
        return index + (unicode ? charAt$1(S, index).length : 1);
      };

      // `RegExpExec` abstract operation
      // https://tc39.github.io/ecma262/#sec-regexpexec
      var regexpExecAbstract = function (R, S) {
        var exec = R.exec;
        if (typeof exec === 'function') {
          var result = exec.call(R, S);
          if (typeof result !== 'object') {
            throw TypeError('RegExp exec method returned something other than an Object or null');
          }
          return result;
        }

        if (classofRaw(R) !== 'RegExp') {
          throw TypeError('RegExp#exec called on incompatible receiver');
        }

        return regexpExec.call(R, S);
      };

      var max$1 = Math.max;
      var min$2 = Math.min;
      var floor$1 = Math.floor;
      var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
      var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

      var maybeToString = function (it) {
        return it === undefined ? it : String(it);
      };

      // @@replace logic
      fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
        var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
        var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
        var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

        return [
          // `String.prototype.replace` method
          // https://tc39.github.io/ecma262/#sec-string.prototype.replace
          function replace(searchValue, replaceValue) {
            var O = requireObjectCoercible(this);
            var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
            return replacer !== undefined
              ? replacer.call(searchValue, O, replaceValue)
              : nativeReplace.call(String(O), searchValue, replaceValue);
          },
          // `RegExp.prototype[@@replace]` method
          // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
          function (regexp, replaceValue) {
            if (
              (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
              (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
            ) {
              var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
              if (res.done) return res.value;
            }

            var rx = anObject(regexp);
            var S = String(this);

            var functionalReplace = typeof replaceValue === 'function';
            if (!functionalReplace) replaceValue = String(replaceValue);

            var global = rx.global;
            if (global) {
              var fullUnicode = rx.unicode;
              rx.lastIndex = 0;
            }
            var results = [];
            while (true) {
              var result = regexpExecAbstract(rx, S);
              if (result === null) break;

              results.push(result);
              if (!global) break;

              var matchStr = String(result[0]);
              if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
            }

            var accumulatedResult = '';
            var nextSourcePosition = 0;
            for (var i = 0; i < results.length; i++) {
              result = results[i];

              var matched = String(result[0]);
              var position = max$1(min$2(toInteger(result.index), S.length), 0);
              var captures = [];
              // NOTE: This is equivalent to
              //   captures = result.slice(1).map(maybeToString)
              // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
              // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
              // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
              for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
              var namedCaptures = result.groups;
              if (functionalReplace) {
                var replacerArgs = [matched].concat(captures, position, S);
                if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
                var replacement = String(replaceValue.apply(undefined, replacerArgs));
              } else {
                replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
              }
              if (position >= nextSourcePosition) {
                accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
                nextSourcePosition = position + matched.length;
              }
            }
            return accumulatedResult + S.slice(nextSourcePosition);
          }
        ];

        // https://tc39.github.io/ecma262/#sec-getsubstitution
        function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
          var tailPos = position + matched.length;
          var m = captures.length;
          var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
          if (namedCaptures !== undefined) {
            namedCaptures = toObject(namedCaptures);
            symbols = SUBSTITUTION_SYMBOLS;
          }
          return nativeReplace.call(replacement, symbols, function (match, ch) {
            var capture;
            switch (ch.charAt(0)) {
              case '$': return '$';
              case '&': return matched;
              case '`': return str.slice(0, position);
              case "'": return str.slice(tailPos);
              case '<':
                capture = namedCaptures[ch.slice(1, -1)];
                break;
              default: // \d\d?
                var n = +ch;
                if (n === 0) return match;
                if (n > m) {
                  var f = floor$1(n / 10);
                  if (f === 0) return match;
                  if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                  return match;
                }
                capture = captures[n - 1];
            }
            return capture === undefined ? '' : capture;
          });
        }
      });

      // iterable DOM collections
      // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
      var domIterables = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
      };

      var ITERATOR$2 = wellKnownSymbol('iterator');
      var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
      var ArrayValues = es_array_iterator.values;

      for (var COLLECTION_NAME in domIterables) {
        var Collection = global_1[COLLECTION_NAME];
        var CollectionPrototype = Collection && Collection.prototype;
        if (CollectionPrototype) {
          // some Chrome versions have non-configurable methods on DOMTokenList
          if (CollectionPrototype[ITERATOR$2] !== ArrayValues) try {
            createNonEnumerableProperty(CollectionPrototype, ITERATOR$2, ArrayValues);
          } catch (error) {
            CollectionPrototype[ITERATOR$2] = ArrayValues;
          }
          if (!CollectionPrototype[TO_STRING_TAG$3]) {
            createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
          }
          if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
            // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
              createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
            } catch (error) {
              CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
            }
          }
        }
      }

      var defineProperty$3 = Object.defineProperty;
      var cache = {};

      var thrower = function (it) { throw it; };

      var arrayMethodUsesToLength = function (METHOD_NAME, options) {
        if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
        if (!options) options = {};
        var method = [][METHOD_NAME];
        var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
        var argument0 = has(options, 0) ? options[0] : thrower;
        var argument1 = has(options, 1) ? options[1] : undefined;

        return cache[METHOD_NAME] = !!method && !fails(function () {
          if (ACCESSORS && !descriptors) return true;
          var O = { length: -1 };

          if (ACCESSORS) defineProperty$3(O, 1, { enumerable: true, get: thrower });
          else O[1] = 1;

          method.call(O, argument0, argument1);
        });
      };

      var $forEach$1 = arrayIteration.forEach;



      var STRICT_METHOD$1 = arrayMethodIsStrict('forEach');
      var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

      // `Array.prototype.forEach` method implementation
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      var arrayForEach = (!STRICT_METHOD$1 || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
        return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      } : [].forEach;

      // `Array.prototype.forEach` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
        forEach: arrayForEach
      });

      var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

      var process = global_1.process;
      var versions = process && process.versions;
      var v8 = versions && versions.v8;
      var match, version;

      if (v8) {
        match = v8.split('.');
        version = match[0] + match[1];
      } else if (engineUserAgent) {
        match = engineUserAgent.match(/Edge\/(\d+)/);
        if (!match || match[1] >= 74) {
          match = engineUserAgent.match(/Chrome\/(\d+)/);
          if (match) version = match[1];
        }
      }

      var engineV8Version = version && +version;

      var SPECIES$2 = wellKnownSymbol('species');

      var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
        // We can't use this feature detection in V8 since it causes
        // deoptimization and serious performance degradation
        // https://github.com/zloirock/core-js/issues/677
        return engineV8Version >= 51 || !fails(function () {
          var array = [];
          var constructor = array.constructor = {};
          constructor[SPECIES$2] = function () {
            return { foo: 1 };
          };
          return array[METHOD_NAME](Boolean).foo !== 1;
        });
      };

      var $map = arrayIteration.map;



      var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
      // FF49- issue
      var USES_TO_LENGTH$1 = arrayMethodUsesToLength('map');

      // `Array.prototype.map` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.map
      // with adding support of @@species
      _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH$1 }, {
        map: function map(callbackfn /* , thisArg */) {
          return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        }
      });

      var nativeAssign = Object.assign;
      var defineProperty$4 = Object.defineProperty;

      // `Object.assign` method
      // https://tc39.github.io/ecma262/#sec-object.assign
      var objectAssign = !nativeAssign || fails(function () {
        // should have correct order of operations (Edge bug)
        if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$4({}, 'a', {
          enumerable: true,
          get: function () {
            defineProperty$4(this, 'b', {
              value: 3,
              enumerable: false
            });
          }
        }), { b: 2 })).b !== 1) return true;
        // should work with symbols and should have deterministic property order (V8 bug)
        var A = {};
        var B = {};
        // eslint-disable-next-line no-undef
        var symbol = Symbol();
        var alphabet = 'abcdefghijklmnopqrst';
        A[symbol] = 7;
        alphabet.split('').forEach(function (chr) { B[chr] = chr; });
        return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
      }) ? function assign(target, source) { // eslint-disable-line no-unused-vars
        var T = toObject(target);
        var argumentsLength = arguments.length;
        var index = 1;
        var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
        var propertyIsEnumerable = objectPropertyIsEnumerable.f;
        while (argumentsLength > index) {
          var S = indexedObject(arguments[index++]);
          var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
          var length = keys.length;
          var j = 0;
          var key;
          while (length > j) {
            key = keys[j++];
            if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
          }
        } return T;
      } : nativeAssign;

      // `Object.assign` method
      // https://tc39.github.io/ecma262/#sec-object.assign
      _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
        assign: objectAssign
      });

      var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

      var FAILS_ON_PRIMITIVES$1 = fails(function () { return !Object.getOwnPropertyNames(1); });

      // `Object.getOwnPropertyNames` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
      _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$1 }, {
        getOwnPropertyNames: nativeGetOwnPropertyNames$2
      });

      var MATCH = wellKnownSymbol('match');

      // `IsRegExp` abstract operation
      // https://tc39.github.io/ecma262/#sec-isregexp
      var isRegexp = function (it) {
        var isRegExp;
        return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
      };

      var SPECIES$3 = wellKnownSymbol('species');

      // `SpeciesConstructor` abstract operation
      // https://tc39.github.io/ecma262/#sec-speciesconstructor
      var speciesConstructor = function (O, defaultConstructor) {
        var C = anObject(O).constructor;
        var S;
        return C === undefined || (S = anObject(C)[SPECIES$3]) == undefined ? defaultConstructor : aFunction$1(S);
      };

      var arrayPush = [].push;
      var min$3 = Math.min;
      var MAX_UINT32 = 0xFFFFFFFF;

      // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
      var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

      // @@split logic
      fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
        var internalSplit;
        if (
          'abbc'.split(/(b)*/)[1] == 'c' ||
          'test'.split(/(?:)/, -1).length != 4 ||
          'ab'.split(/(?:ab)*/).length != 2 ||
          '.'.split(/(.?)(.?)/).length != 4 ||
          '.'.split(/()()/).length > 1 ||
          ''.split(/.?/).length
        ) {
          // based on es5-shim implementation, need to rework it
          internalSplit = function (separator, limit) {
            var string = String(requireObjectCoercible(this));
            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
            if (lim === 0) return [];
            if (separator === undefined) return [string];
            // If `separator` is not a regex, use native split
            if (!isRegexp(separator)) {
              return nativeSplit.call(string, separator, lim);
            }
            var output = [];
            var flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline ? 'm' : '') +
                        (separator.unicode ? 'u' : '') +
                        (separator.sticky ? 'y' : '');
            var lastLastIndex = 0;
            // Make `global` and avoid `lastIndex` issues by working with a copy
            var separatorCopy = new RegExp(separator.source, flags + 'g');
            var match, lastIndex, lastLength;
            while (match = regexpExec.call(separatorCopy, string)) {
              lastIndex = separatorCopy.lastIndex;
              if (lastIndex > lastLastIndex) {
                output.push(string.slice(lastLastIndex, match.index));
                if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= lim) break;
              }
              if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
            }
            if (lastLastIndex === string.length) {
              if (lastLength || !separatorCopy.test('')) output.push('');
            } else output.push(string.slice(lastLastIndex));
            return output.length > lim ? output.slice(0, lim) : output;
          };
        // Chakra, V8
        } else if ('0'.split(undefined, 0).length) {
          internalSplit = function (separator, limit) {
            return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
          };
        } else internalSplit = nativeSplit;

        return [
          // `String.prototype.split` method
          // https://tc39.github.io/ecma262/#sec-string.prototype.split
          function split(separator, limit) {
            var O = requireObjectCoercible(this);
            var splitter = separator == undefined ? undefined : separator[SPLIT];
            return splitter !== undefined
              ? splitter.call(separator, O, limit)
              : internalSplit.call(String(O), separator, limit);
          },
          // `RegExp.prototype[@@split]` method
          // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
          //
          // NOTE: This cannot be properly polyfilled in engines that don't support
          // the 'y' flag.
          function (regexp, limit) {
            var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
            if (res.done) return res.value;

            var rx = anObject(regexp);
            var S = String(this);
            var C = speciesConstructor(rx, RegExp);

            var unicodeMatching = rx.unicode;
            var flags = (rx.ignoreCase ? 'i' : '') +
                        (rx.multiline ? 'm' : '') +
                        (rx.unicode ? 'u' : '') +
                        (SUPPORTS_Y ? 'y' : 'g');

            // ^(? + rx + ) is needed, in combination with some S slicing, to
            // simulate the 'y' flag.
            var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
            var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
            if (lim === 0) return [];
            if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
            var p = 0;
            var q = 0;
            var A = [];
            while (q < S.length) {
              splitter.lastIndex = SUPPORTS_Y ? q : 0;
              var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
              var e;
              if (
                z === null ||
                (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
              ) {
                q = advanceStringIndex(S, q, unicodeMatching);
              } else {
                A.push(S.slice(p, q));
                if (A.length === lim) return A;
                for (var i = 1; i <= z.length - 1; i++) {
                  A.push(z[i]);
                  if (A.length === lim) return A;
                }
                q = p = e;
              }
            }
            A.push(S.slice(p));
            return A;
          }
        ];
      }, !SUPPORTS_Y);

      var createProperty = function (object, key, value) {
        var propertyKey = toPrimitive(key);
        if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
        else object[propertyKey] = value;
      };

      var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
      var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
      var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/679
      var IS_CONCAT_SPREADABLE_SUPPORT = engineV8Version >= 51 || !fails(function () {
        var array = [];
        array[IS_CONCAT_SPREADABLE] = false;
        return array.concat()[0] !== array;
      });

      var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

      var isConcatSpreadable = function (O) {
        if (!isObject(O)) return false;
        var spreadable = O[IS_CONCAT_SPREADABLE];
        return spreadable !== undefined ? !!spreadable : isArray(O);
      };

      var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

      // `Array.prototype.concat` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.concat
      // with adding support of @@isConcatSpreadable and @@species
      _export({ target: 'Array', proto: true, forced: FORCED }, {
        concat: function concat(arg) { // eslint-disable-line no-unused-vars
          var O = toObject(this);
          var A = arraySpeciesCreate(O, 0);
          var n = 0;
          var i, k, length, len, E;
          for (i = -1, length = arguments.length; i < length; i++) {
            E = i === -1 ? O : arguments[i];
            if (isConcatSpreadable(E)) {
              len = toLength(E.length);
              if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
              for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
            } else {
              if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
              createProperty(A, n++, E);
            }
          }
          A.length = n;
          return A;
        }
      });

      var $indexOf = arrayIncludes.indexOf;



      var nativeIndexOf = [].indexOf;

      var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
      var STRICT_METHOD$2 = arrayMethodIsStrict('indexOf');
      var USES_TO_LENGTH$2 = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

      // `Array.prototype.indexOf` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
      _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || !STRICT_METHOD$2 || !USES_TO_LENGTH$2 }, {
        indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
          return NEGATIVE_ZERO
            // convert -0 to +0
            ? nativeIndexOf.apply(this, arguments) || 0
            : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
        }
      });

      var HAS_SPECIES_SUPPORT$1 = arrayMethodHasSpeciesSupport('slice');
      var USES_TO_LENGTH$3 = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

      var SPECIES$4 = wellKnownSymbol('species');
      var nativeSlice = [].slice;
      var max$2 = Math.max;

      // `Array.prototype.slice` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.slice
      // fallback for not array-like ES3 strings and DOM objects
      _export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT$1 || !USES_TO_LENGTH$3 }, {
        slice: function slice(start, end) {
          var O = toIndexedObject(this);
          var length = toLength(O.length);
          var k = toAbsoluteIndex(start, length);
          var fin = toAbsoluteIndex(end === undefined ? length : end, length);
          // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
          var Constructor, result, n;
          if (isArray(O)) {
            Constructor = O.constructor;
            // cross-realm fallback
            if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
              Constructor = undefined;
            } else if (isObject(Constructor)) {
              Constructor = Constructor[SPECIES$4];
              if (Constructor === null) Constructor = undefined;
            }
            if (Constructor === Array || Constructor === undefined) {
              return nativeSlice.call(O, k, fin);
            }
          }
          result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
          for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
          result.length = n;
          return result;
        }
      });

      var defineProperty$5 = objectDefineProperty.f;

      var FunctionPrototype = Function.prototype;
      var FunctionPrototypeToString = FunctionPrototype.toString;
      var nameRE = /^\s*function ([^ (]*)/;
      var NAME = 'name';

      // Function instances `.name` property
      // https://tc39.github.io/ecma262/#sec-function-instances-name
      if (descriptors && !(NAME in FunctionPrototype)) {
        defineProperty$5(FunctionPrototype, NAME, {
          configurable: true,
          get: function () {
            try {
              return FunctionPrototypeToString.call(this).match(nameRE)[1];
            } catch (error) {
              return '';
            }
          }
        });
      }

      var freezing = !fails(function () {
        return Object.isExtensible(Object.preventExtensions({}));
      });

      var internalMetadata = createCommonjsModule(function (module) {
      var defineProperty = objectDefineProperty.f;



      var METADATA = uid('meta');
      var id = 0;

      var isExtensible = Object.isExtensible || function () {
        return true;
      };

      var setMetadata = function (it) {
        defineProperty(it, METADATA, { value: {
          objectID: 'O' + ++id, // object ID
          weakData: {}          // weak collections IDs
        } });
      };

      var fastKey = function (it, create) {
        // return a primitive with prefix
        if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
        if (!has(it, METADATA)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return 'F';
          // not necessary to add metadata
          if (!create) return 'E';
          // add missing metadata
          setMetadata(it);
        // return object ID
        } return it[METADATA].objectID;
      };

      var getWeakData = function (it, create) {
        if (!has(it, METADATA)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return true;
          // not necessary to add metadata
          if (!create) return false;
          // add missing metadata
          setMetadata(it);
        // return the store of weak collections IDs
        } return it[METADATA].weakData;
      };

      // add metadata on freeze-family methods calling
      var onFreeze = function (it) {
        if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
        return it;
      };

      var meta = module.exports = {
        REQUIRED: false,
        fastKey: fastKey,
        getWeakData: getWeakData,
        onFreeze: onFreeze
      };

      hiddenKeys[METADATA] = true;
      });

      var ITERATOR$3 = wellKnownSymbol('iterator');
      var ArrayPrototype$1 = Array.prototype;

      // check on default Array iterator
      var isArrayIteratorMethod = function (it) {
        return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$3] === it);
      };

      var ITERATOR$4 = wellKnownSymbol('iterator');

      var getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR$4]
          || it['@@iterator']
          || iterators[classof(it)];
      };

      // call something on iterator step with safe closing on error
      var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
        try {
          return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
        // 7.4.6 IteratorClose(iterator, completion)
        } catch (error) {
          var returnMethod = iterator['return'];
          if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
          throw error;
        }
      };

      var iterate_1 = createCommonjsModule(function (module) {
      var Result = function (stopped, result) {
        this.stopped = stopped;
        this.result = result;
      };

      var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
        var boundFunction = functionBindContext(fn, that, AS_ENTRIES ? 2 : 1);
        var iterator, iterFn, index, length, result, next, step;

        if (IS_ITERATOR) {
          iterator = iterable;
        } else {
          iterFn = getIteratorMethod(iterable);
          if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
          // optimisation for array iterators
          if (isArrayIteratorMethod(iterFn)) {
            for (index = 0, length = toLength(iterable.length); length > index; index++) {
              result = AS_ENTRIES
                ? boundFunction(anObject(step = iterable[index])[0], step[1])
                : boundFunction(iterable[index]);
              if (result && result instanceof Result) return result;
            } return new Result(false);
          }
          iterator = iterFn.call(iterable);
        }

        next = iterator.next;
        while (!(step = next.call(iterator)).done) {
          result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
          if (typeof result == 'object' && result && result instanceof Result) return result;
        } return new Result(false);
      };

      iterate.stop = function (result) {
        return new Result(true, result);
      };
      });

      var anInstance = function (it, Constructor, name) {
        if (!(it instanceof Constructor)) {
          throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
        } return it;
      };

      var ITERATOR$5 = wellKnownSymbol('iterator');
      var SAFE_CLOSING = false;

      try {
        var called = 0;
        var iteratorWithReturn = {
          next: function () {
            return { done: !!called++ };
          },
          'return': function () {
            SAFE_CLOSING = true;
          }
        };
        iteratorWithReturn[ITERATOR$5] = function () {
          return this;
        };
        // eslint-disable-next-line no-throw-literal
        Array.from(iteratorWithReturn, function () { throw 2; });
      } catch (error) { /* empty */ }

      var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
        if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
        var ITERATION_SUPPORT = false;
        try {
          var object = {};
          object[ITERATOR$5] = function () {
            return {
              next: function () {
                return { done: ITERATION_SUPPORT = true };
              }
            };
          };
          exec(object);
        } catch (error) { /* empty */ }
        return ITERATION_SUPPORT;
      };

      // makes subclassing work correct for wrapped built-ins
      var inheritIfRequired = function ($this, dummy, Wrapper) {
        var NewTarget, NewTargetPrototype;
        if (
          // it can work only with native `setPrototypeOf`
          objectSetPrototypeOf &&
          // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
          typeof (NewTarget = dummy.constructor) == 'function' &&
          NewTarget !== Wrapper &&
          isObject(NewTargetPrototype = NewTarget.prototype) &&
          NewTargetPrototype !== Wrapper.prototype
        ) objectSetPrototypeOf($this, NewTargetPrototype);
        return $this;
      };

      var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
        var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
        var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
        var ADDER = IS_MAP ? 'set' : 'add';
        var NativeConstructor = global_1[CONSTRUCTOR_NAME];
        var NativePrototype = NativeConstructor && NativeConstructor.prototype;
        var Constructor = NativeConstructor;
        var exported = {};

        var fixMethod = function (KEY) {
          var nativeMethod = NativePrototype[KEY];
          redefine(NativePrototype, KEY,
            KEY == 'add' ? function add(value) {
              nativeMethod.call(this, value === 0 ? 0 : value);
              return this;
            } : KEY == 'delete' ? function (key) {
              return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
            } : KEY == 'get' ? function get(key) {
              return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
            } : KEY == 'has' ? function has(key) {
              return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
            } : function set(key, value) {
              nativeMethod.call(this, key === 0 ? 0 : key, value);
              return this;
            }
          );
        };

        // eslint-disable-next-line max-len
        if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
          new NativeConstructor().entries().next();
        })))) {
          // create collection constructor
          Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
          internalMetadata.REQUIRED = true;
        } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
          var instance = new Constructor();
          // early implementations not supports chaining
          var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
          // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
          var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
          // most early implementations doesn't supports iterables, most modern - not close it correctly
          // eslint-disable-next-line no-new
          var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
          // for early implementations -0 and +0 not the same
          var BUGGY_ZERO = !IS_WEAK && fails(function () {
            // V8 ~ Chromium 42- fails only with 5+ elements
            var $instance = new NativeConstructor();
            var index = 5;
            while (index--) $instance[ADDER](index, index);
            return !$instance.has(-0);
          });

          if (!ACCEPT_ITERABLES) {
            Constructor = wrapper(function (dummy, iterable) {
              anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
              var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
              if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
              return that;
            });
            Constructor.prototype = NativePrototype;
            NativePrototype.constructor = Constructor;
          }

          if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
            fixMethod('delete');
            fixMethod('has');
            IS_MAP && fixMethod('get');
          }

          if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

          // weak collections should not contains .clear method
          if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
        }

        exported[CONSTRUCTOR_NAME] = Constructor;
        _export({ global: true, forced: Constructor != NativeConstructor }, exported);

        setToStringTag(Constructor, CONSTRUCTOR_NAME);

        if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

        return Constructor;
      };

      var redefineAll = function (target, src, options) {
        for (var key in src) redefine(target, key, src[key], options);
        return target;
      };

      var SPECIES$5 = wellKnownSymbol('species');

      var setSpecies = function (CONSTRUCTOR_NAME) {
        var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
        var defineProperty = objectDefineProperty.f;

        if (descriptors && Constructor && !Constructor[SPECIES$5]) {
          defineProperty(Constructor, SPECIES$5, {
            configurable: true,
            get: function () { return this; }
          });
        }
      };

      var defineProperty$6 = objectDefineProperty.f;








      var fastKey = internalMetadata.fastKey;


      var setInternalState$3 = internalState.set;
      var internalStateGetterFor = internalState.getterFor;

      var collectionStrong = {
        getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function (that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState$3(that, {
              type: CONSTRUCTOR_NAME,
              index: objectCreate(null),
              first: undefined,
              last: undefined,
              size: 0
            });
            if (!descriptors) that.size = 0;
            if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
          });

          var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

          var define = function (that, key, value) {
            var state = getInternalState(that);
            var entry = getEntry(that, key);
            var previous, index;
            // change existing entry
            if (entry) {
              entry.value = value;
            // create new entry
            } else {
              state.last = entry = {
                index: index = fastKey(key, true),
                key: key,
                value: value,
                previous: previous = state.last,
                next: undefined,
                removed: false
              };
              if (!state.first) state.first = entry;
              if (previous) previous.next = entry;
              if (descriptors) state.size++;
              else that.size++;
              // add to index
              if (index !== 'F') state.index[index] = entry;
            } return that;
          };

          var getEntry = function (that, key) {
            var state = getInternalState(that);
            // fast case
            var index = fastKey(key);
            var entry;
            if (index !== 'F') return state.index[index];
            // frozen object case
            for (entry = state.first; entry; entry = entry.next) {
              if (entry.key == key) return entry;
            }
          };

          redefineAll(C.prototype, {
            // 23.1.3.1 Map.prototype.clear()
            // 23.2.3.2 Set.prototype.clear()
            clear: function clear() {
              var that = this;
              var state = getInternalState(that);
              var data = state.index;
              var entry = state.first;
              while (entry) {
                entry.removed = true;
                if (entry.previous) entry.previous = entry.previous.next = undefined;
                delete data[entry.index];
                entry = entry.next;
              }
              state.first = state.last = undefined;
              if (descriptors) state.size = 0;
              else that.size = 0;
            },
            // 23.1.3.3 Map.prototype.delete(key)
            // 23.2.3.4 Set.prototype.delete(value)
            'delete': function (key) {
              var that = this;
              var state = getInternalState(that);
              var entry = getEntry(that, key);
              if (entry) {
                var next = entry.next;
                var prev = entry.previous;
                delete state.index[entry.index];
                entry.removed = true;
                if (prev) prev.next = next;
                if (next) next.previous = prev;
                if (state.first == entry) state.first = next;
                if (state.last == entry) state.last = prev;
                if (descriptors) state.size--;
                else that.size--;
              } return !!entry;
            },
            // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
            // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
            forEach: function forEach(callbackfn /* , that = undefined */) {
              var state = getInternalState(this);
              var boundFunction = functionBindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
              var entry;
              while (entry = entry ? entry.next : state.first) {
                boundFunction(entry.value, entry.key, this);
                // revert to the last existing entry
                while (entry && entry.removed) entry = entry.previous;
              }
            },
            // 23.1.3.7 Map.prototype.has(key)
            // 23.2.3.7 Set.prototype.has(value)
            has: function has(key) {
              return !!getEntry(this, key);
            }
          });

          redefineAll(C.prototype, IS_MAP ? {
            // 23.1.3.6 Map.prototype.get(key)
            get: function get(key) {
              var entry = getEntry(this, key);
              return entry && entry.value;
            },
            // 23.1.3.9 Map.prototype.set(key, value)
            set: function set(key, value) {
              return define(this, key === 0 ? 0 : key, value);
            }
          } : {
            // 23.2.3.1 Set.prototype.add(value)
            add: function add(value) {
              return define(this, value = value === 0 ? 0 : value, value);
            }
          });
          if (descriptors) defineProperty$6(C.prototype, 'size', {
            get: function () {
              return getInternalState(this).size;
            }
          });
          return C;
        },
        setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
          var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
          var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
          var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
          // add .keys, .values, .entries, [@@iterator]
          // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
          defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
            setInternalState$3(this, {
              type: ITERATOR_NAME,
              target: iterated,
              state: getInternalCollectionState(iterated),
              kind: kind,
              last: undefined
            });
          }, function () {
            var state = getInternalIteratorState(this);
            var kind = state.kind;
            var entry = state.last;
            // revert to the last existing entry
            while (entry && entry.removed) entry = entry.previous;
            // get next entry
            if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
              // or finish the iteration
              state.target = undefined;
              return { value: undefined, done: true };
            }
            // return step by kind
            if (kind == 'keys') return { value: entry.key, done: false };
            if (kind == 'values') return { value: entry.value, done: false };
            return { value: [entry.key, entry.value], done: false };
          }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

          // add [@@species], 23.1.2.2, 23.2.2.2
          setSpecies(CONSTRUCTOR_NAME);
        }
      };

      // `Map` constructor
      // https://tc39.github.io/ecma262/#sec-map-objects
      var es_map = collection('Map', function (init) {
        return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
      }, collectionStrong);

      var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


      var FAILS_ON_PRIMITIVES$2 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
      var FORCED$1 = !descriptors || FAILS_ON_PRIMITIVES$2;

      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
      _export({ target: 'Object', stat: true, forced: FORCED$1, sham: !descriptors }, {
        getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
          return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
        }
      });

      // `SameValue` abstract operation
      // https://tc39.github.io/ecma262/#sec-samevalue
      var sameValue = Object.is || function is(x, y) {
        // eslint-disable-next-line no-self-compare
        return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
      };

      // `Object.is` method
      // https://tc39.github.io/ecma262/#sec-object.is
      _export({ target: 'Object', stat: true }, {
        is: sameValue
      });

      // `Set` constructor
      // https://tc39.github.io/ecma262/#sec-set-objects
      var es_set = collection('Set', function (init) {
        return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
      }, collectionStrong);

      // a string of all valid unicode whitespaces
      // eslint-disable-next-line max-len
      var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

      var whitespace = '[' + whitespaces + ']';
      var ltrim = RegExp('^' + whitespace + whitespace + '*');
      var rtrim = RegExp(whitespace + whitespace + '*$');

      // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
      var createMethod$3 = function (TYPE) {
        return function ($this) {
          var string = String(requireObjectCoercible($this));
          if (TYPE & 1) string = string.replace(ltrim, '');
          if (TYPE & 2) string = string.replace(rtrim, '');
          return string;
        };
      };

      var stringTrim = {
        // `String.prototype.{ trimLeft, trimStart }` methods
        // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
        start: createMethod$3(1),
        // `String.prototype.{ trimRight, trimEnd }` methods
        // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
        end: createMethod$3(2),
        // `String.prototype.trim` method
        // https://tc39.github.io/ecma262/#sec-string.prototype.trim
        trim: createMethod$3(3)
      };

      var non = '\u200B\u0085\u180E';

      // check that a method works with the correct list
      // of whitespaces and has a correct name
      var stringTrimForced = function (METHOD_NAME) {
        return fails(function () {
          return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
        });
      };

      var $trim = stringTrim.trim;


      // `String.prototype.trim` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.trim
      _export({ target: 'String', proto: true, forced: stringTrimForced('trim') }, {
        trim: function trim() {
          return $trim(this);
        }
      });

      var getWeakData = internalMetadata.getWeakData;








      var setInternalState$4 = internalState.set;
      var internalStateGetterFor$1 = internalState.getterFor;
      var find = arrayIteration.find;
      var findIndex = arrayIteration.findIndex;
      var id$1 = 0;

      // fallback for uncaught frozen keys
      var uncaughtFrozenStore = function (store) {
        return store.frozen || (store.frozen = new UncaughtFrozenStore());
      };

      var UncaughtFrozenStore = function () {
        this.entries = [];
      };

      var findUncaughtFrozen = function (store, key) {
        return find(store.entries, function (it) {
          return it[0] === key;
        });
      };

      UncaughtFrozenStore.prototype = {
        get: function (key) {
          var entry = findUncaughtFrozen(this, key);
          if (entry) return entry[1];
        },
        has: function (key) {
          return !!findUncaughtFrozen(this, key);
        },
        set: function (key, value) {
          var entry = findUncaughtFrozen(this, key);
          if (entry) entry[1] = value;
          else this.entries.push([key, value]);
        },
        'delete': function (key) {
          var index = findIndex(this.entries, function (it) {
            return it[0] === key;
          });
          if (~index) this.entries.splice(index, 1);
          return !!~index;
        }
      };

      var collectionWeak = {
        getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
          var C = wrapper(function (that, iterable) {
            anInstance(that, C, CONSTRUCTOR_NAME);
            setInternalState$4(that, {
              type: CONSTRUCTOR_NAME,
              id: id$1++,
              frozen: undefined
            });
            if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
          });

          var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

          var define = function (that, key, value) {
            var state = getInternalState(that);
            var data = getWeakData(anObject(key), true);
            if (data === true) uncaughtFrozenStore(state).set(key, value);
            else data[state.id] = value;
            return that;
          };

          redefineAll(C.prototype, {
            // 23.3.3.2 WeakMap.prototype.delete(key)
            // 23.4.3.3 WeakSet.prototype.delete(value)
            'delete': function (key) {
              var state = getInternalState(this);
              if (!isObject(key)) return false;
              var data = getWeakData(key);
              if (data === true) return uncaughtFrozenStore(state)['delete'](key);
              return data && has(data, state.id) && delete data[state.id];
            },
            // 23.3.3.4 WeakMap.prototype.has(key)
            // 23.4.3.4 WeakSet.prototype.has(value)
            has: function has$1(key) {
              var state = getInternalState(this);
              if (!isObject(key)) return false;
              var data = getWeakData(key);
              if (data === true) return uncaughtFrozenStore(state).has(key);
              return data && has(data, state.id);
            }
          });

          redefineAll(C.prototype, IS_MAP ? {
            // 23.3.3.3 WeakMap.prototype.get(key)
            get: function get(key) {
              var state = getInternalState(this);
              if (isObject(key)) {
                var data = getWeakData(key);
                if (data === true) return uncaughtFrozenStore(state).get(key);
                return data ? data[state.id] : undefined;
              }
            },
            // 23.3.3.5 WeakMap.prototype.set(key, value)
            set: function set(key, value) {
              return define(this, key, value);
            }
          } : {
            // 23.4.3.1 WeakSet.prototype.add(value)
            add: function add(value) {
              return define(this, value, true);
            }
          });

          return C;
        }
      };

      var es_weakMap = createCommonjsModule(function (module) {






      var enforceIternalState = internalState.enforce;


      var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
      var isExtensible = Object.isExtensible;
      var InternalWeakMap;

      var wrapper = function (init) {
        return function WeakMap() {
          return init(this, arguments.length ? arguments[0] : undefined);
        };
      };

      // `WeakMap` constructor
      // https://tc39.github.io/ecma262/#sec-weakmap-constructor
      var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak);

      // IE11 WeakMap frozen keys fix
      // We can't use feature detection because it crash some old IE builds
      // https://github.com/zloirock/core-js/issues/485
      if (nativeWeakMap && IS_IE11) {
        InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
        internalMetadata.REQUIRED = true;
        var WeakMapPrototype = $WeakMap.prototype;
        var nativeDelete = WeakMapPrototype['delete'];
        var nativeHas = WeakMapPrototype.has;
        var nativeGet = WeakMapPrototype.get;
        var nativeSet = WeakMapPrototype.set;
        redefineAll(WeakMapPrototype, {
          'delete': function (key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen) state.frozen = new InternalWeakMap();
              return nativeDelete.call(this, key) || state.frozen['delete'](key);
            } return nativeDelete.call(this, key);
          },
          has: function has(key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen) state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) || state.frozen.has(key);
            } return nativeHas.call(this, key);
          },
          get: function get(key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen) state.frozen = new InternalWeakMap();
              return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
            } return nativeGet.call(this, key);
          },
          set: function set(key, value) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceIternalState(this);
              if (!state.frozen) state.frozen = new InternalWeakMap();
              nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
            } else nativeSet.call(this, key, value);
            return this;
          }
        });
      }
      });

      // `WeakSet` constructor
      // https://tc39.github.io/ecma262/#sec-weakset-constructor
      collection('WeakSet', function (init) {
        return function WeakSet() { return init(this, arguments.length ? arguments[0] : undefined); };
      }, collectionWeak);

      for (var COLLECTION_NAME$1 in domIterables) {
        var Collection$1 = global_1[COLLECTION_NAME$1];
        var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
          createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
        } catch (error) {
          CollectionPrototype$1.forEach = arrayForEach;
        }
      }

    }
  };
});
