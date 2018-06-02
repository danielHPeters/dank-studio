import Sound from './Sound'

/**
 * HiHat class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HiHat implements Sound {
  context: AudioContext
  compressor: DynamicsCompressorNode
  gain: GainNode
  frequency: number
  volume: number
  private source: AudioBufferSourceNode
  private buffer: AudioBuffer

  /**
   * Constructor.
   *
   * @param context
   * @param buffer
   */
  constructor (context: AudioContext, buffer: AudioBuffer) {
    this.context = context
    this.source = context.createBufferSource()
    this.buffer = buffer
    this.frequency = 0
  }

  init (): void {
    this.source.buffer = this.buffer
    this.source.connect(this.context.destination)
  }

  play (loop: boolean = false, delay: number): void {
    this.init()
    this.source.start(delay)
  }

  stop (delay: number = 0): void {
    // Not implemented.
  }
}
