import ISound from '../../interfaces/ISound'

/**
 * Sound class
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Sound implements ISound {
  public context: AudioContext
  public gain: GainNode
  public frequency: number
  private compressor: DynamicsCompressorNode
  private oscillator: OscillatorNode
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
    this.gain = this.context.createGain()
    this.gain.connect(this.compressor)
    this.oscillator.type = this.oscillatorType
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.gain)
    this.gain.gain.setValueAtTime(0, this.context.currentTime)
    this.gain.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.1)
    this.oscillator.start(0.5)
  }

  public play (loop: boolean = false, delay: number = 0): void {

  }

  /**
   * Stop sound.
   */
  public stop (delay: number = 0): void {
    this.gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.8)
    this.oscillator.stop(this.context.currentTime + 2.8)
  }
}