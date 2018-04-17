import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'
import { ESoundType } from '../enum/ESoundType'

/**
 * Init script. Set all keys here.
 * 
 * @author Daniel Peters
 * @version 1.1
 */
document.addEventListener('DOMContentLoaded', () => {
  const keyBoard = new KeyBoard()
  const keyPad = new KeyPad('keyPad', keyBoard)

  keyBoard.registerKey('a', 261.63)
  keyBoard.registerKey('s', 293.66)
  keyBoard.registerKey('d', 329.63)
  keyBoard.registerKey('f', 349.23)
  keyBoard.registerKey('g', 392.00)
  keyBoard.registerKey('h', 440)
  keyBoard.registerKey('j', 493.88)
  keyBoard.registerKey('k', 523.25)
  keyBoard.registerKey('q', 150, ESoundType.KICK)
  keyBoard.registerKey('w', 100, ESoundType.SNARE)
  keyPad.addAllKeys()
})
