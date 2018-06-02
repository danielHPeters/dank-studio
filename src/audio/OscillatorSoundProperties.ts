import BaseSoundProperties from './BaseSoundProperties'

/**
 * Sound property for sounds generated from oscillator.
 */
export default class OscillatorSoundProperties extends BaseSoundProperties {
  type: OscillatorType

  constructor (frequency: number, volume: number, type: OscillatorType) {
    super(frequency, volume)
    this.type = type
  }
}
