/**
 * HiHat class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class HiHat {
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

  private init (): void {
    this.source.buffer = this.buffer
    this.source.connect(this.context.destination)
  }

  /**
   *
   * @param {number} time
   */
  public play (time: number): void {
    this.init()
    this.source.start(time)
  }
}
