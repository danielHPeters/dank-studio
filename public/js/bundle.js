/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Keyboard = __webpack_require__(1);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  var keyBoard = new _Keyboard2.default();
  keyBoard.registerKey('a', 261.63);
  keyBoard.registerKey('s', 293.66);
  keyBoard.registerKey('d', 329.63);
  keyBoard.registerKey('f', 349.23);
  keyBoard.registerKey('g', 392.00);
  keyBoard.registerKey('h', 440);
  keyBoard.registerKey('j', 493.88);
}

document.addEventListener('DOMContentLoaded', init());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Sound = __webpack_require__(2);

var _Sound2 = _interopRequireDefault(_Sound);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.context = new AudioContext();
    } catch (error) {
      console.log('This browser does not support Web Audio API.');
    }
    // this.gainNode = this.context.createGain()
    this.keyActionMap = {};
    this.registeredInputs = {};

    // this.gainNode.gain.value = 1
    // this.gainNode.connect(this.context.destination)
    this.registerKeyHandler();
  }

  /**
   * Register a keyboard key with a sound
   * @param {string} key
   * @param {number} frequency
   */


  _createClass(Keyboard, [{
    key: 'registerKey',
    value: function registerKey(key, frequency) {
      this.keyActionMap[key] = new _Sound2.default(this.context, frequency);
    }
  }, {
    key: 'registerKeyHandler',
    value: function registerKeyHandler() {
      var _this = this;

      window.addEventListener('keydown', function (event) {
        if (!_this.registeredInputs[event.key] && _this.keyActionMap[event.key] !== undefined) {
          _this.keyActionMap[event.key].connectAndStart();
          _this.registeredInputs[event.key] = true;
        }
      });
      window.addEventListener('keyup', function (event) {
        if (_this.registeredInputs[event.key] && _this.keyActionMap[event.key] !== undefined) {
          _this.keyActionMap[event.key].stopAndDisconnect();
          _this.registeredInputs[event.key] = false;
        }
      });
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
  function Sound(context) {
    var frequency = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'sine';

    _classCallCheck(this, Sound);

    this.context = context;
    this.frequency = frequency;
    this.type = type;
  }

  _createClass(Sound, [{
    key: 'connectAndStart',
    value: function connectAndStart() {
      this.oscillator = this.context.createOscillator();
      this.gainNode = this.context.createGain();
      this.gainNode.connect(this.context.destination);
      this.oscillator.type = this.type;
      this.oscillator.frequency.value = this.frequency;
      this.oscillator.connect(this.gainNode);
      this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
      this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.1);
      this.oscillator.start(0);
    }
  }, {
    key: 'stopAndDisconnect',
    value: function stopAndDisconnect() {
      this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.6);
      this.oscillator.stop(this.context.currentTime + 1.6);
    }
  }]);

  return Sound;
}();

exports.default = Sound;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
