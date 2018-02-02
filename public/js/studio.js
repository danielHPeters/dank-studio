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

Object.defineProperty(exports, "__esModule", { value: true });
const Keyboard_1 = __webpack_require__(1);
const KeyPad_1 = __webpack_require__(3);
const Kick_1 = __webpack_require__(4);
const Snare_1 = __webpack_require__(5);
const playKick = keyBoard => {
    const kick = new Kick_1.default(keyBoard.context, 150);
    const now = keyBoard.context.currentTime;
    kick.play(now);
};
const playSnare = keyBoard => {
    const snare = new Snare_1.default(keyBoard.context, 100, 1000, 'highpass', 'triangle');
    const now = keyBoard.context.currentTime;
    snare.play(now);
};
const init = () => {
    const keyBoard = new Keyboard_1.default();
    const keyPad = new KeyPad_1.default('keyPad', keyBoard);
    const kickButton = document.getElementById('kick');
    const snareButton = document.getElementById('snare');
    kickButton.addEventListener('click', () => playKick(keyBoard));
    snareButton.addEventListener('click', () => playSnare(keyBoard));
    keyBoard.registerKey('a', 261.63);
    keyBoard.registerKey('s', 293.66);
    keyBoard.registerKey('d', 329.63);
    keyBoard.registerKey('f', 349.23);
    keyBoard.registerKey('g', 392.00);
    keyBoard.registerKey('h', 440);
    keyBoard.registerKey('j', 493.88);
    keyBoard.registerKey('k', 523.25);
    keyPad.addAllKeys();
};
document.addEventListener('DOMContentLoaded', init);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Sound_1 = __webpack_require__(2);
class Keyboard {
    constructor() {
        try {
            this.context = new AudioContext();
        }
        catch (error) {
            console.log('This browser does not support Web Audio API.');
        }
        this.compressor = this.context.createDynamicsCompressor();
        this.keyActionMap = {};
        this.registeredInputs = {};
        this.initCompressor();
        this.registerKeyHandler();
    }
    initCompressor() {
        this.compressor.threshold.value = -50;
        this.compressor.knee.value = 40;
        this.compressor.ratio.value = 12;
        this.compressor.attack.value = 0;
        this.compressor.release.value = 0.25;
        this.compressor.connect(this.context.destination);
    }
    registerKey(key, frequency, type = 'sine') {
        this.keyActionMap[key] = new Sound_1.default(this.context, this.compressor, frequency, type);
    }
    setDownEvent(key) {
        if (!this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
            document.getElementById(key).classList.add('keyActive');
            this.keyActionMap[key].connectAndStart();
            this.registeredInputs[key] = true;
        }
    }
    setUpEvent(key) {
        if (this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
            document.getElementById(key).classList.remove('keyActive');
            this.keyActionMap[key].stopAndDisconnect();
            this.registeredInputs[key] = false;
        }
    }
    registerKeyHandler() {
        window.addEventListener('keydown', event => this.setDownEvent(event.key));
        window.addEventListener('keyup', event => this.setUpEvent(event.key));
    }
}
exports.default = Keyboard;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Sound {
    constructor(context, compressor, frequency, oscillatorType) {
        this.context = context;
        this.compressor = compressor;
        this.frequency = frequency;
        this.oscillatorType = oscillatorType;
    }
    connectAndStart() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();
        this.gainNode.connect(this.compressor);
        this.oscillator.type = this.oscillatorType;
        this.oscillator.frequency.value = this.frequency;
        this.oscillator.connect(this.gainNode);
        this.gainNode.gain.setValueAtTime(0, this.context.currentTime);
        this.gainNode.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.1);
        this.oscillator.start(0.5);
    }
    stopAndDisconnect() {
        this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.8);
        this.oscillator.stop(this.context.currentTime + 2.8);
    }
}
exports.default = Sound;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class KeyPad {
    constructor(id, keyBoard) {
        this.id = id;
        this.element = document.getElementById(this.id);
        this.keyBoard = keyBoard;
    }
    addKey(id, text) {
        const newKey = document.createElement('li');
        const span = document.createElement('span');
        const textNode = document.createTextNode(id);
        const textNode2 = document.createTextNode(text);
        const lineBreak = document.createElement('br');
        span.appendChild(textNode);
        span.appendChild(lineBreak);
        span.appendChild(textNode2);
        span.classList.add('keyDescription');
        newKey.appendChild(span);
        newKey.classList.add('key');
        newKey.setAttribute('id', id);
        newKey.addEventListener('mouseenter', event => this.keyBoard.setDownEvent(id));
        newKey.addEventListener('touchstart', event => this.keyBoard.setDownEvent(id));
        newKey.addEventListener('mouseleave', event => this.keyBoard.setUpEvent(id));
        newKey.addEventListener('touchend', event => this.keyBoard.setUpEvent(id));
        this.element.appendChild(newKey);
    }
    addAllKeys() {
        Object.keys(this.keyBoard.keyActionMap).forEach(key => {
            this.addKey(key, this.keyBoard.keyActionMap[key].frequency);
        });
    }
}
exports.default = KeyPad;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Kick {
    constructor(context, frequency) {
        this.context = context;
        this.oscillator = context.createOscillator();
        this.gain = context.createGain();
        this.frequency = frequency;
    }
    init() {
        this.oscillator.connect(this.gain);
        this.gain.connect(this.context.destination);
    }
    play(time) {
        const delay = 0.5;
        const rampValue = 0.01;
        this.init();
        this.oscillator.frequency.setValueAtTime(this.frequency, time);
        this.gain.gain.setValueAtTime(1, time);
        this.oscillator.frequency.exponentialRampToValueAtTime(rampValue, time + delay);
        this.gain.gain.exponentialRampToValueAtTime(rampValue, time + delay);
        this.oscillator.start(time);
        this.oscillator.stop(time + delay);
    }
}
exports.default = Kick;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Snare {
    constructor(context, frequency, noiseFrequency, noiseFilter, oscillatorType) {
        this.context = context;
        this.noise = context.createBufferSource();
        this.frequency = frequency;
        this.noiseFrequency = noiseFrequency;
        this.noiseFilter = noiseFilter;
        this.oscillatorType = oscillatorType;
        this.noiseGain = context.createGain();
        this.oscillator = context.createOscillator();
        this.oscillatorGain = context.createGain();
    }
    createNoiseBuffer() {
        const bufferSize = this.context.sampleRate;
        const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        return buffer;
    }
    init() {
        const noiseFilter = this.context.createBiquadFilter();
        this.noise.buffer = this.createNoiseBuffer();
        noiseFilter.type = this.noiseFilter;
        noiseFilter.frequency.value = this.noiseFrequency;
        this.noise.connect(noiseFilter);
        noiseFilter.connect(this.noiseGain);
        this.noiseGain.connect(this.context.destination);
        this.oscillator.type = this.oscillatorType;
        this.oscillator.connect(this.oscillatorGain);
        this.oscillatorGain.connect(this.context.destination);
    }
    play(time) {
        this.init();
        this.noiseGain.gain.setValueAtTime(1, time);
        this.noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        this.noise.start(time);
        this.oscillator.frequency.setValueAtTime(this.frequency, time);
        this.oscillatorGain.gain.setValueAtTime(0.7, time);
        this.oscillatorGain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
        this.oscillator.start(time);
        this.oscillator.stop(time + 0.2);
        this.noise.stop(time + 0.2);
    }
}
exports.default = Snare;


/***/ })
/******/ ]);
//# sourceMappingURL=studio.js.map