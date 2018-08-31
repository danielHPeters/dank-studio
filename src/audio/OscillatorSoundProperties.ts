import BaseSoundProperties from './BaseSoundProperties'

/**
 * Sound property for sounds generated from oscillator.
 *
 * @author Daniel Peters <daniel.peters.ch@gmail.com>
 * @version 1.0
 */
export default class OscillatorSoundProperties extends BaseSoundProperties {
  type: OscillatorType

  constructor (frequency: number, volume: number, type: OscillatorType) {
    super(frequency, volume)
    this.type = type
  }
}
