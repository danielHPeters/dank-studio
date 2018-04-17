import ISound from '../../interfaces/ISound'
import IAudioItem, { AudioItemStyles } from '../../interfaces/IAdioItem'

/**
 * Audio properties display element implementation.
 * 
 * @author Daniel Peters
 * @version 1.0
 */
export default class AudioItem implements IAudioItem {
  element: HTMLElement
  sound: ISound

  constructor (id: string, sound: ISound) {
    this.element = document.createElement('div')
    this.element.id = id
    this.element.classList.add(AudioItemStyles.AUDIO_ITEM)
    this.sound = sound
    this.element.addEventListener('mouseenter', () => this.sound.init())
    this.element.addEventListener('mouseleave', () => this.sound.stop())
    this.mapSoundToElement()
  }

  /**
   * Map all attributes of the sound to a html element and add it to the container element.
   */
  private mapSoundToElement() {
    Object.keys(this.sound).forEach(prop => {
      const propElement = document.createElement('input') as HTMLInputElement

      if (isNaN(Number(this.sound[prop]))) {
        propElement.type = 'text'
      } else {
        propElement.type = 'number'
      }
      
      propElement.classList.add(AudioItemStyles.AUDIO_ITEM_PROP)
      propElement.value = this.sound[prop]
      propElement.addEventListener('change', () => this.sound[prop] = propElement.value)
      this.element.appendChild(propElement)
    })
  }
}
