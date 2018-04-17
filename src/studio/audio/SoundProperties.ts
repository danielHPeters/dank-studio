import ISoundProperties from '../../interfaces/ISoundProperties'

export default class SoundProperties implements ISoundProperties {
  frequency: number
  volume: number
  constructor(frequency: number, volume: number) {
    this.frequency = frequency
    this.volume = volume
  }
}
