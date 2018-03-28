/**
 * Interface ISound.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default interface ISound {
  context: AudioContext
  gain: GainNode
  frequency: number
  /**
   * Initialize the sound.
   */
  init (): void

  /**
   * Play the sound with an optional delay and loop.
   * 
   * @param {boolean} loop Default false (Set to true to run in loop).
   * @param {number} delay Optional delay.
   */
  play (loop?: boolean, delay?: number): void

  /**
   * Stop the sound.
   *
   * @param {number} delay Optional delay
   */
  stop (delay?: number): void
}