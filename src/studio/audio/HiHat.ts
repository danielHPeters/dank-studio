import ISound from '../../interfaces/ISound'

/**
 * HiHat class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HiHat implements ISound {
  public context: AudioContext
  public gain: GainNode
  private source: AudioBufferSourceNode
  private buffer: AudioBuffer
  public frequency: number
  /**
   * Conscrutor.
   *
   * @param {AudioContext} context
   * @param {AudioBuffer} buffer
   */
  constructor (context: AudioContext, buffer: AudioBuffer) {
    this.context = context
    this.source = context.createBufferSource()
    this.buffer = buffer
    this.frequency = 0
  }

  public init (): void {
    this.source.buffer = this.buffer
    this.source.connect(this.context.destination)
  }

  public play (loop: boolean = false, delay: number): void {
    this.init()
    this.source.start(delay)
  }

  public stop (delay: number = 0) {

  }
}
