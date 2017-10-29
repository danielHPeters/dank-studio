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
    this.registerKeyHandler()
  }

  /**
   * Register a keyboard key with a sound
   * @param {string} key
   * @param {number} frequency
   */
  registerKey (key, frequency) {
    this.keyActionMap[key] = new Sound(this.context, frequency)
  }

  registerKeyHandler () {
    window.addEventListener('keydown', event => {
      if (!this.registeredInputs[event.key] && this.keyActionMap[event.key] !== undefined) {
        this.keyActionMap[event.key].connectAndStart()
        this.registeredInputs[event.key] = true
      }
    })
    window.addEventListener('keyup', event => {
      if (this.registeredInputs[event.key] && this.keyActionMap[event.key] !== undefined) {
        this.keyActionMap[event.key].stopAndDisconnect()
        this.registeredInputs[event.key] = false
      }
    })
  }
}
