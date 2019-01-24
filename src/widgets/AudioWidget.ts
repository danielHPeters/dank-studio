import Sound from '../audio/Sound'

/**
 * Interface to be extended by audio widgets.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface AudioWidget {
  element: HTMLElement
  sound: Sound
}
