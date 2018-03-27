import ISound from '../../interfaces/ISound'

/**
 * Drum 'Kick'.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Kick implements ISound {
  private context: AudioContext
  private oscillator: OscillatorNode
  private gain: GainNode
  private frequency: number
  /**
   * Constructor.
   *
   * @param {AudioContext} context
   * @param {number} frequency
   */
  constructor (context: AudioContext, frequency: number) {
    this.context = context
    this.oscillator = context.createOscillator()
    this.gain = context.createGain()
    this.frequency = frequency
  }

  /**
   *
   */
  public init (): void {
    this.oscillator.connect(this.gain)
    this.gain.connect(this.context.destination)
  }

  public play (loop: boolean = false, delay: number = 0): void {
    const delTime = 0.5
    const rampValue = 0.01
    this.init()

    this.oscillator.frequency.setValueAtTime(this.frequency, delay)
    this.gain.gain.setValueAtTime(1, delay)

    this.oscillator.frequency.exponentialRampToValueAtTime(rampValue, delay + delTime)
    this.gain.gain.exponentialRampToValueAtTime(rampValue, delay + delTime)

    this.oscillator.start(delay)

    this.oscillator.stop(delay + delTime)
  }

  public stop (delay: number = 0): void {

  }
}
