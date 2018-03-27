import ISound from '../../interfaces/ISound'

/**
 * HiHat class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HiHat implements ISound {
  private context: AudioContext
  private source: AudioBufferSourceNode
  private buffer: AudioBuffer
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
