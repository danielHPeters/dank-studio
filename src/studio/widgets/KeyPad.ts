/**
 * Keypad Widget class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
import Keyboard from '../input/Keyboard'

export default class KeyPad {
  private id: string
  private element: HTMLElement
  private keyBoard: Keyboard
  /**
   * Constructor.
   *
   * @param {string} id
   * @param {Keyboard} keyBoard
   */
  constructor (id: string, keyBoard: Keyboard) {
    this.id = id
    this.element = document.getElementById(this.id)
    this.keyBoard = keyBoard
  }

  /**
   * Add a key element.
   *
   * @param {string} id
   * @param {string} text
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
    span.classList.add('keyDescription')
    newKey.appendChild(span)
    newKey.classList.add('key')
    newKey.setAttribute('id', id)
    newKey.addEventListener('mouseenter', event => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('touchstart', event => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('mouseleave', event => this.keyBoard.setUpEvent(id))
    newKey.addEventListener('touchend', event => this.keyBoard.setUpEvent(id))
    this.element.appendChild(newKey)
  }

  /**
   * Add all keys registered on the keyboard to the keypad.
   */
  public addAllKeys (): void {
    this.keyBoard.keySoundMap.forEach((sound, key) => this.addKey(key, sound.frequency.toString()))
  }
}
