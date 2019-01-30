import Keyboard from '../input/Keyboard'

export enum Styles {
  KEY = 'key', DESCRIPTION = 'keyDescription'
}

/**
 * Keypad widget class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class KeyPad {
  private element: HTMLElement
  private keyBoard: Keyboard
  /**
   * Constructor.
   *
   * @param id
   * @param keyBoard
   */
  constructor (id: string, keyBoard: Keyboard) {
    this.element = document.getElementById(id) || document.createElement('div')
    this.keyBoard = keyBoard
  }

  /**
   * Add all keys registered on the keyboard to the keypad.
   */
  addAllKeys (): void {
    this.keyBoard.keySoundMap.forEach((sound, key) => this.addKey(key, sound.frequency.toString()))
  }

  /**
   * Add a key element.
   *
   * @param id
   * @param text
   */
  private addKey (id: string, text: string): void {
    const newKey = document.createElement('li')
    const span = document.createElement('span')
    const textNode = document.createTextNode(id)
    const textNode2 = document.createTextNode(text)
    const lineBreak = document.createElement('br')

    span.appendChild(textNode)
    span.appendChild(lineBreak)
    span.appendChild(textNode2)
    span.classList.add(Styles.DESCRIPTION)
    newKey.appendChild(span)
    newKey.classList.add(Styles.KEY)
    newKey.setAttribute('id', id)
    newKey.addEventListener('mouseenter', () => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('touchstart', () => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('mouseleave', () => this.keyBoard.setUpEvent(id))
    newKey.addEventListener('touchend', () => this.keyBoard.setUpEvent(id))
    this.element.appendChild(newKey)
  }
}
