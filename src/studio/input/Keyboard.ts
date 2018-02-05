import Sound from '../audio/Sound'

/**
 * Keyboard class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Keyboard {
  context: AudioContext
  compressor: DynamicsCompressorNode
  keyActionMap
  registeredInputs
  /**
   * Constructor.
   */
  constructor () {
    try {
      this.context = new AudioContext()
    } catch (error) {
      console.log('This browser does not support Web Audio API.')
    }
    this.compressor = this.context.createDynamicsCompressor()
    // this.gainNode = this.context.createGain()k
    this.keyActionMap = {}
    this.registeredInputs = {}

    // this.gainNode.noiseGain.value = 1
    // this.gainNode.connect(this.context.destination)
    this.initCompressor()
    this.registerKeyHandler()
  }

  /**
   * Initialize the compressor to fix audio clipping.
   */
  private initCompressor (): void {
    this.compressor.threshold.value = -50
    this.compressor.knee.value = 40
    this.compressor.ratio.value = 12
    this.compressor.attack.value = 0
    this.compressor.release.value = 0.25
    this.compressor.connect(this.context.destination)
  }

  /**
   * Register a keyboard key with a sound
   *
   * @param {string} key
   * @param {number} frequency
   * @param {OscillatorType} type
   */
  public registerKey (key, frequency, type: OscillatorType = 'sawtooth'): void {
    this.keyActionMap[key] = new Sound(this.context, this.compressor, frequency, type)
  }

  /**
   *
   * @param key
   */
  public setDownEvent (key) {
    if (!this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
      document.getElementById(key).classList.add('keyActive')
      this.keyActionMap[key].connectAndStart()
      this.registeredInputs[key] = true
    }
  }

  /**jhgfdsa
   *
   * @param {string} key
   */
  public setUpEvent (key: string): void {
    if (this.registeredInputs[key] && this.keyActionMap[key] !== undefined) {
      document.getElementById(key).classList.remove('keyActive')
      this.keyActionMap[key].stopAndDisconnect()
      this.registeredInputs[key] = false
    }
  }

  /**
   *
   */
  private registerKeyHandler (): void {
    window.addEventListener('keydown', event => this.setDownEvent(event.key))
    window.addEventListener('keyup', event => this.setUpEvent(event.key))
  }
}
