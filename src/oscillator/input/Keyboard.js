import Sound from './../audio/Sound'

export default class Keyboard {
  constructor () {
    try {
      window.AudioContext = window.AudioContext || window.webkitAudioContext
      this.context = new AudioContext()
    } catch (error) {
      console.log('This browser does not support Web Audio API.')
    }
    // this.gainNode = this.context.createGain()
    this.keyActionMap = {}
    this.registeredInputs = {}

    // this.gainNode.gain.value = 1
    // this.gainNode.connect(this.context.destination)
    this.createCompressor()
    this.registerKeyHandler()
  }

  createCompressor () {
    this.compressor = this.context.createDynamicsCompressor()
    this.compressor.threshold.value = -50
    this.compressor.knee.value = 40
    this.compressor.ratio.value = 12
    this.compressor.attack.value = 0
    this.compressor.release.value = 0.25
    this.compressor.connect(this.context.destination)
  }

  /**
   * Register a keyboard key with a sound
   * @param {string} key
   * @param {number} frequency
   * @param {string} type
   */
  registerKey (key, frequency, type = 'sawtooth') {
    this.keyActionMap[key] = new Sound(this.context, this.compressor, frequency, type)
  }

  registerKeyHandler () {
    window.addEventListener('keydown', event => this.setDownEvent(event.key))
    window.addEventListener('keyup', event => this.setUpEvent(event.key))
  }

  setDownEvent (key) {
    if (!this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
      document.getElementById(key).classList.add('keyActive')
      this.keyActionMap[key].connectAndStart()
      this.registeredInputs[key] = true
    }
  }

  setUpEvent (key) {
    if (this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
      document.getElementById(key).classList.remove('keyActive')
      this.keyActionMap[key].stopAndDisconnect()
      this.registeredInputs[key] = false
    }
  }

  /**
   * Sets type of sounds
   * @param {string} type sound type (eg. sine, square)
   */
  setSoundsType (type) {
    Object.keys(this.keyActionMap).forEach(sound => { sound.type = type })
  }
}
