import Sound from '../audio/Sound'
import AudioWidget from './AudioWidget'

export enum Styles {
  AUDIO_ITEM = 'audio-item',
  AUDIO_ITEM_PROP = 'audio-item-property'
}

/**
 * Audio properties display element implementation.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class BoxAudioWidget implements AudioWidget {
  element: HTMLElement
  sound: Sound

  constructor (id: string, sound: Sound) {
    this.element = document.createElement('div')
    this.element.id = id
    this.element.classList.add(Styles.AUDIO_ITEM)
    this.sound = sound
    this.element.addEventListener('mouseenter', () => this.sound.init())
    this.element.addEventListener('mouseleave', () => this.sound.stop())
  }
}
