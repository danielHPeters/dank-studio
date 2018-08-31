import Sound from '../audio/Sound'
import AudioWidget from './AudioWidget'

export enum Styles {
  AUDIO_ITEM = 'audio-item',
  AUDIO_ITEM_PROP = 'audio-item-property'
}

/**
 * Audio properties display element implementation.
 *
 * @author Daniel Peters <daniel.peters.ch@gmail.com>
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
    this.mapSoundToElement()
  }

  /**
   * Map all attributes of the sound to a html element and add it to the container element.
   */
  private mapSoundToElement (): void {
    Object.keys(this.sound).forEach(prop => {
      const propElement = document.createElement('input') as HTMLInputElement

      if (isNaN(Number(this.sound[prop]))) {
        propElement.type = 'text'
      } else {
        propElement.type = 'number'
      }

      propElement.classList.add(Styles.AUDIO_ITEM_PROP)
      propElement.value = this.sound[prop]
      propElement.addEventListener('change', () => this.sound[prop] = propElement.value)
      this.element.appendChild(propElement)
    })
  }
}
