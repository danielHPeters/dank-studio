import ISound from './ISound'

export enum AudioItemStyles {
  AUDIO_ITEM = 'audio-item',
  AUDIO_ITEM_PROP = 'audio-item-property'
}

export default interface IAudioItem {
  element: HTMLElement
  sound: ISound      
}
