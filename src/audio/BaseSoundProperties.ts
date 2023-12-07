/**
 * Sound properties base class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class BaseSoundProperties {
  frequency: number
  volume: number

  constructor (frequency: number, volume: number) {
    this.frequency = frequency
    this.volume = volume
  }
}
