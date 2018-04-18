import { AudioItemStyles } from '../../interfaces/IAdioItem'

export default class BaseSoundProperties {
  frequency: number
  volume: number
  mapToElement(element: HTMLElement) {
    Object.keys(this).forEach(prop => {
      const propElement = document.createElement('input') as HTMLInputElement

      if (isNaN(Number(this[prop]))) {
        propElement.type = 'text'
      } else {
        propElement.type = 'number'
      }
      
      propElement.classList.add(AudioItemStyles.AUDIO_ITEM_PROP)
      propElement.value = this[prop]
      propElement.addEventListener('change', () => this[prop] = propElement.value)
      element.appendChild(propElement)
    })
  }
}
