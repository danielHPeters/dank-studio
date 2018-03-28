import Sound from '../audio/Sound'
import ISound from '../../interfaces/ISound'
import Snare from '../audio/Snare'
import Kick from '../audio/Kick'

export enum KeyboardStyles {
  ACTIVE = 'keyActive'
}

/**
 * Keyboard class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Keyboard {
  context: AudioContext
  compressor: DynamicsCompressorNode
  keySoundMap: Map<string, ISound>
  registeredInputs: Map<string, boolean>
  /**
   * Constructor.
   */
  constructor () {
    try {
      this.context = new AudioContext()
      this.compressor = this.context.createDynamicsCompressor()
      // this.gainNode = this.context.createGain()
      this.keySoundMap = new Map<string, ISound>()
      this.registeredInputs = new Map<string, boolean>()

      // this.gainNode.noiseGain.value = 1
      // this.gainNode.connect(this.context.destination)
      this.initCompressor()
      this.registerKeyHandler()
    } catch (error) {
      console.log('This browser does not support Web Audio API.', error)
    }
  }

  /**
   * Register a keyboard key with a sound
   *
   * @param {string} key
   * @param {number} frequency
   * @param {OscillatorType} type
   */
  public registerKey (key: string, frequency: number, type: OscillatorType = 'sawtooth'): void {
    this.keySoundMap.set(key, new Sound(this.context, this.compressor, frequency, type))
    this.keySoundMap.set(key, new Snare(this.context, 100, 1000, 'highpass', 'triangle'))
    this.keySoundMap.set(key, new Kick(this.context, 150))
  }

  /**
   *
   * @param {string} key
   */
  public setDownEvent (key: string) {
    if (!this.registeredInputs[key] && this.keySoundMap[key] !== undefined) {
      document.getElementById(key).classList.add(KeyboardStyles.ACTIVE)
      this.keySoundMap.get(key).init()
      this.keySoundMap.get(key).play()
      this.registeredInputs.set(key, true)
    }
  }

  /**
   *
   * @param {string} key
   */
  public setUpEvent (key: string): void {
    if (this.registeredInputs[key] && this.keySoundMap[key] !== undefined) {
      document.getElementById(key).classList.remove(KeyboardStyles.ACTIVE)
      this.keySoundMap.get(key).stop()
      this.registeredInputs.set(key, false)
    }
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
   *
   */
  private registerKeyHandler (): void {
    window.addEventListener('keydown', event => this.setDownEvent(event.key))
    window.addEventListener('keyup', event => this.setUpEvent(event.key))
  }
}
