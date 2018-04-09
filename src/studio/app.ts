import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'
import Kick from './audio/Kick'
import Snare from './audio/Snare'
import { ESoundType } from '../enum/ESoundType'

/*const playKick = keyBoard => {
  const kick = new Kick(keyBoard.context, 150)
  kick.play(false, keyBoard.context.currentTime)
}

const playSnare = keyBoard => {
  const snare = new Snare(keyBoard.context, 100, 1000, 'highpass', 'triangle')
  snare.play(false, keyBoard.context.currentTime)
}*/

document.addEventListener('DOMContentLoaded', () => {
  const keyBoard = new KeyBoard()
  const keyPad = new KeyPad('keyPad', keyBoard)
  const kickButton = document.getElementById('kick')
  const snareButton = document.getElementById('snare')

  //kickButton.addEventListener('click', () => playKick(keyBoard))
  //snareButton.addEventListener('click', () => playSnare(keyBoard))
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
