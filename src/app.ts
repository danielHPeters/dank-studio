import KeyBoard from './input/Keyboard'
import KeyPad from './widgets/KeyPad'
import { SoundType } from './audio/SoundType'

/**
 * Init script. Set all keys here.
 *
 * @author Daniel Peters
 * @version 1.1
 */
document.addEventListener('DOMContentLoaded', () => {
  const keyBoard = new KeyBoard()
  const keyPad = new KeyPad('keyPad', keyBoard)
  const audioSliderLabel = document.createElement('label') as HTMLLabelElement
  const audioSlider = document.createElement('input') as HTMLInputElement
  const audioSliderId = 'volume'
  audioSliderLabel.htmlFor = audioSliderId
  audioSliderLabel.textContent = 'Adjust Volume'
  audioSlider.id = audioSliderId
  audioSlider.type = 'range'
  audioSlider.addEventListener('change', () => keyBoard.masterGain.gain.value = Number(audioSlider.value))
  audioSlider.max = '1'
  audioSlider.min = '0'
  audioSlider.step = '0.1'
  document.body.appendChild(audioSliderLabel)
  document.body.appendChild(audioSlider)

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
