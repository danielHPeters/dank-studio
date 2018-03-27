import ISound from '../../interfaces/ISound'

/**
 * Sound class
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Sound implements ISound {
  private context: AudioContext
  private compressor: DynamicsCompressorNode
  private frequency: number
  private oscillator: OscillatorNode
  private gainNode: GainNode
  public oscillatorType: OscillatorType

  /**
   * Constructor.
   *
   * @param {AudioContext} context
   * @param {DynamicsCompressorNode} compressor
   * @param {number} frequency
   * @param {OscillatorType} oscillatorType
   */
  constructor (context: AudioContext, compressor: DynamicsCompressorNode, frequency: number, oscillatorType: OscillatorType) {
    this.context = context
    this.compressor = compressor
    this.frequency = frequency
    this.oscillatorType = oscillatorType
  }

  /**
   * Connect to audio output and play sound.
   */
  public init (): void {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.compressor)
    this.oscillator.type = this.oscillatorType
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.gainNode)
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime)
    this.gainNode.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.1)
    this.oscillator.start(0.5)
  }

  public play (loop: boolean = false, delay: number = 0): void {

  }

  /**
   * Stop sound.
   */
  public stop (delay: number = 0): void {
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.8)
    this.oscillator.stop(this.context.currentTime + 2.8)
  }
}
