import { SoundType } from '../audio/SoundType'
import Snare from '../audio/Snare'
import OscillatorSound from '../audio/OscillatorSound'
import Sound from '../audio/Sound'
import Kick from '../audio/Kick'

/**
 * Factory for Sound object.
 *
 * @author Daniel Peters <daniel.peters.ch@gmail.com>
 * @version 1.0
 */
export default class SoundFactory {
  context: AudioContext
  compressor: DynamicsCompressorNode

  /**
   * Constructor.
   *
   * @param context Application audio context
   * @param compressor Compressor used to fix clipping
   */
  constructor (context: AudioContext, compressor: DynamicsCompressorNode) {
    this.context = context
    this.compressor = compressor
  }

  /**
   * Create a sound object with the specified parameters.
   *
   * @param frequency
   * @param type
   * @param oscillatorType
   */
  create (frequency: number, type: SoundType = SoundType.OSCILLATOR, oscillatorType: OscillatorType = 'square'): Sound {
    switch (type) {
      case SoundType.OSCILLATOR:
        return new OscillatorSound(this.context, this.compressor, frequency, oscillatorType)
      case SoundType.SNARE:
        return new Snare(this.context, this.compressor, frequency, 1000, 'highpass', 'triangle')
      case SoundType.KICK:
        return new Kick(this.context, this.compressor, frequency)
      case SoundType.HIT_HAT:
        throw new Error('Not Implemented!')
    }
  }
}
