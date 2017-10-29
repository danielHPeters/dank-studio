import KeyBoard from './input/Keyboard'

function init () {
  const keyBoard = new KeyBoard()
  keyBoard.registerKey('a', 261.63)
  keyBoard.registerKey('s', 293.66)
  keyBoard.registerKey('d', 329.63)
  keyBoard.registerKey('f', 349.23)
  keyBoard.registerKey('g', 392.00)
  keyBoard.registerKey('h', 440)
  keyBoard.registerKey('j', 493.88)
}

document.addEventListener('DOMContentLoaded', init())
