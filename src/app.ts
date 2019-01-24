import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'
import { SoundType } from './audio/SoundType'
import AudioSlider from './widgets/AudioSlider'

/**
 * Init script. Set all keys here.
 *
 * @author Daniel Peters
 * @version 1.1
 */
document.addEventListener('DOMContentLoaded', () => {
  const keyBoard = new KeyBoard()
  const keyPad = new KeyPad('keyPad', keyBoard)
  const volumeSlider = new AudioSlider('volume', 'Adjust Volume', keyBoard.masterGain)

  document.body.appendChild(volumeSlider.render())

  keyBoard.registerKey('a', 261.63)
  keyBoard.registerKey('s', 293.66)
  keyBoard.registerKey('d', 329.63)
  keyBoard.registerKey('f', 349.23)
  keyBoard.registerKey('g', 392.00)
  keyBoard.registerKey('h', 440)
  keyBoard.registerKey('j', 493.88)
  keyBoard.registerKey('k', 523.25)
  keyBoard.registerKey('q', 150, SoundType.KICK)
  keyBoard.registerKey('w', 100, SoundType.SNARE)
  keyPad.addAllKeys()
})
