import { ESoundType } from '../enum/ESoundType'
import Snare from '../studio/audio/Snare'
import Sound from '../studio/audio/Sound'
import ISound from '../interfaces/ISound'
import Kick from '../studio/audio/Kick'

/**
 * Factory for ISound object.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class SoundFactory {
  context: AudioContext
  compressor: DynamicsCompressorNode

  /**
   * Constructor.
   * 
   * @param {AudioContext} context Application audio context
   * @param {DynamicsCompressorNode} compressor Compressor used to fix clipping
   */
  constructor (context: AudioContext, compressor: DynamicsCompressorNode) {
    this.context = context
    this.compressor = compressor
  }
  /**
   * Create a sound object with the specified parameters.
   *
   * @param {number} frequency
   * @param {ESoundType} type
   * @param {OscillatorType} oscillatorType
   */
    create (frequency: number, type: ESoundType = ESoundType.NOTE, oscillatorType: OscillatorType = 'square'): ISound {
      switch (type) {
        case ESoundType.NOTE:
          return new Sound(this.context, this.compressor, frequency, oscillatorType)
        case ESoundType.SNARE:
          return new Snare(this.context, this.compressor, frequency, 1000, 'highpass', 'triangle')
        case ESoundType.KICK:
          return new Kick(this.context, this.compressor, frequency)
        case ESoundType.HITHAT:
          throw new Error('Not Implemented!')
      }
  }
}
