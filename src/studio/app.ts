import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'
import Kick from './audio/Kick'
import Snare from './audio/Snare'

const playKick = keyBoard => {
  const kick = new Kick(keyBoard.context, 150)
  const now = keyBoard.context.currentTime
  kick.play(now)
}

const playSnare = keyBoard => {
  const snare = new Snare(keyBoard.context, 100, 1000, 'highpass', 'triangle')
  const now = keyBoard.context.currentTime
  snare.play(now)
}

const init = () => {
  const keyBoard = new KeyBoard()
  const keyPad = new KeyPad('keyPad', keyBoard)
  const kickButton = document.getElementById('kick')
  const snareButton = document.getElementById('snare')
  const mouseHandler = event => {
    event.preventDefault()
    switch (event.button) {
      case 1:
        break
      case 2:
        playSnare(keyBoard)
        break
      default:
        playKick(keyBoard)
        break
    }
  }
  kickButton.addEventListener('click', () => playKick(keyBoard))
  snareButton.addEventListener('click', () => playSnare(keyBoard))
  document.addEventListener('click', mouseHandler)
  document.addEventListener('contextmenu', ev => ev.preventDefault())
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

document.addEventListener('DOMContentLoaded', init)
