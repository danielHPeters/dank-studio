import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'

function init () {
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
  keyPad.addAllKeys()
}

document.addEventListener('DOMContentLoaded', () => init())
