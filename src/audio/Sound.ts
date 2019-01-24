/**
 * Interface Sound.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Sound {
  context: AudioContext
  gain: GainNode
  frequency: number
  volume: number

  /**
   * Initialize the sound.
   */
  init (): void

  /**
   * Play the sound with an optional delay and loop.
   *
   * @param loop Default false (Set to true to run in loop)
   * @param delay Optional delay
   */
  play (loop?: boolean, delay?: number): void

  /**
   * Stop the sound.
   *
   * @param delay Optional delay
   */
  stop (delay?: number): void
}
