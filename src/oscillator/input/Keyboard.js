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
   */
  registerKey (key, frequency) {
    this.keyActionMap[key] = new Sound(this.context, this.compressor, frequency)
  }

  registerKeyHandler () {
    window.addEventListener('keydown', event => {
      if (!this.registeredInputs[event.key] && this.keyActionMap[event.key] !== undefined) {
        document.getElementById(event.key).classList.add('keyActive')
        this.keyActionMap[event.key].connectAndStart()
        this.registeredInputs[event.key] = true
      }
    })
    window.addEventListener('keyup', event => {
      if (this.registeredInputs[event.key] && this.keyActionMap[event.key] !== undefined) {
        document.getElementById(event.key).classList.remove('keyActive')
        this.keyActionMap[event.key].stopAndDisconnect()
        this.registeredInputs[event.key] = false
      }
    })
  }
}
