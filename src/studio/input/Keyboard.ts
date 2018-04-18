import Sound from '../audio/Sound'
import ISound from '../../interfaces/ISound'
import Snare from '../audio/Snare'
import Kick from '../audio/Kick'
import { ESoundType } from '../../enum/ESoundType'
import AudioItem from '../widgets/AudioItem';
import SoundFactory from '../../factory/SoundFactory';

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
  soundFactory: SoundFactory
  /**
   * Constructor.
   */
  constructor () {
    try {
      this.context = new AudioContext()
      this.compressor = this.context.createDynamicsCompressor()
      this.soundFactory = new SoundFactory(this.context, this.compressor)
      this.keySoundMap = new Map<string, ISound>()
      this.registeredInputs = new Map<string, boolean>()

      this.initCompressor()
      this.registerKeyHandler()
      const audioItem = new AudioItem('test', new Sound(this.context, this.compressor, 440, 'sine'))
      document.body.appendChild(audioItem.element)
    } catch (error) {
      console.log('This browser does not support Web Audio API.', error)
    }
  }

  /**
   * Register a keyboard key with a sound
   *
   * @param {string} key
   * @param {number} frequency
   * @param {ESoundType} type
   * @param {OscillatorType} oscillatorType
   */
  registerKey (key: string, frequency: number, type: ESoundType = ESoundType.NOTE, oscillatorType: OscillatorType = 'square'): void {
    this.keySoundMap.set(key, this.soundFactory.create(frequency, type, oscillatorType))
  }

  /**
   *
   * @param {string} key
   */
  setDownEvent (key: string) {
    if (!this.registeredInputs.get(key) && this.keySoundMap.get(key) !== undefined) {
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
  setUpEvent (key: string): void {
    if (this.registeredInputs.get(key) && this.keySoundMap.get(key) !== undefined) {
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
