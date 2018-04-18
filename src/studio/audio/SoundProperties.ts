import BaseSoundProperties from './BaseSoundProperties';

/**
 * Soundproperty for sounds generated from oscillator See {@link Sound}
 */
export default class SoundProperties extends BaseSoundProperties {
  type: OscillatorType
  constructor(frequency: number, volume: number, type: OscillatorType) {
    super(frequency, volume)
    this.type = type
  }
}
