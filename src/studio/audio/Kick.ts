/**
 * Drum 'Kick'.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Kick {
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
  private init (): void {
    this.oscillator.connect(this.gain)
    this.gain.connect(this.context.destination)
  }

  /**
   * Initialize and play the sound.
   *
   * @param time Current Time
   */
  public play (time: number): void {
    const delay = 0.5
    const rampValue = 0.01
    this.init()

    this.oscillator.frequency.setValueAtTime(this.frequency, time)
    this.gain.gain.setValueAtTime(1, time)

    this.oscillator.frequency.exponentialRampToValueAtTime(rampValue, time + delay)
    this.gain.gain.exponentialRampToValueAtTime(rampValue, time + delay)

    this.oscillator.start(time)

    this.oscillator.stop(time + delay)
  }
}
