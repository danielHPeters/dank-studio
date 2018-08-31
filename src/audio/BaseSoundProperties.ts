import { Styles } from '../widgets/BoxAudioWidget'

/**
 * Sound properties base class.
 *
 * @author Daniel Peters <daniel.peters.ch@gmail.com>
 * @version 1.0
 */
export default class BaseSoundProperties {
  frequency: number
  volume: number

  constructor (frequency: number, volume: number) {
    this.frequency = frequency
    this.volume = volume
  }

  mapToElement (element: HTMLElement): void {
    Object.keys(this).forEach(prop => {
      const propElement = document.createElement('input') as HTMLInputElement

      propElement.type = isNaN(Number(this[prop])) ? 'text' : 'number'
      propElement.classList.add(Styles.AUDIO_ITEM_PROP)
      propElement.value = this[prop]
      propElement.addEventListener('change', () => this[prop] = propElement.value)
      element.appendChild(propElement)
    })
  }
}
