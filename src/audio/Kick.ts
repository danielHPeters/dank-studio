import Sound from './Sound'

/**
 * Drum 'Kick'.
 *
 * @author Daniel Peters <daniel.peters.ch@gmail.com>
 * @version 1.0
 */
export default class Kick implements Sound {
  context: AudioContext
  compressor: DynamicsCompressorNode
  oscillator: OscillatorNode
  gain: GainNode
  frequency: number
  volume: number

  constructor (context: AudioContext, compressor: DynamicsCompressorNode, frequency: number) {
    this.context = context
    this.compressor = compressor
    this.frequency = frequency
  }

  init (): void {
    const delay = this.context.currentTime
    this.oscillator = this.context.createOscillator()
    this.gain = this.context.createGain()
    this.oscillator.connect(this.gain)
    this.gain.connect(this.compressor)
    const delTime = 0.5
    const rampValue = 0.01

    this.oscillator.frequency.setValueAtTime(this.frequency, delay)
    this.gain.gain.setValueAtTime(1, delay)

    this.oscillator.frequency.exponentialRampToValueAtTime(rampValue, delay + delTime)
    this.gain.gain.exponentialRampToValueAtTime(rampValue, delay + delTime)

    this.oscillator.start(delay)

    this.oscillator.stop(delay + delTime)
  }

  play (loop: boolean = false, delay: number = 0): void {
    // Not implemented.
  }

  stop (delay: number = 0): void {
    // Not implemented.
  }
}
