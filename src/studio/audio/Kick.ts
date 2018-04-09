import ISound from '../../interfaces/ISound'

/**
 * Drum 'Kick'.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Kick implements ISound {
  public context: AudioContext
  public oscillator: OscillatorNode
  public gain: GainNode
  public frequency: number
  /**
   * Constructor.
   *
   * @param {AudioContext} context
   * @param {number} frequency
   */
  constructor (context: AudioContext, frequency: number) {
    this.context = context
    this.frequency = frequency
  }

  /**
   *
   */
  public init (): void {
    const delay = this.context.currentTime
    this.oscillator = this.context.createOscillator()
    this.gain = this.context.createGain()
    this.oscillator.connect(this.gain)
    this.gain.connect(this.context.destination)
    const delTime = 0.5
    const rampValue = 0.01

    this.oscillator.frequency.setValueAtTime(this.frequency, delay)
    this.gain.gain.setValueAtTime(1, delay)

    this.oscillator.frequency.exponentialRampToValueAtTime(rampValue, delay + delTime)
    this.gain.gain.exponentialRampToValueAtTime(rampValue, delay + delTime)

    this.oscillator.start(delay)

    this.oscillator.stop(delay + delTime)
  }

  public play (loop: boolean = false, delay: number = 0): void {

  }

  public stop (delay: number = 0): void {

  }
}
