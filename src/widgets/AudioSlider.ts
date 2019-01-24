/**
 * Volume slider.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class AudioSlider {
  private id: string
  private context: GainNode
  private readonly type: string = 'range'
  private container: HTMLElement
  private label: HTMLLabelElement
  private input: HTMLInputElement
  private minValue: string = '0'
  private maxValue: string = '1'
  private step: string = '0.1'

  constructor (id: string, labelText: string, context: GainNode) {
    this.id = id
    this.context = context
    this.container = document.createElement('div')
    this.label = document.createElement('label') as HTMLLabelElement
    this.input = document.createElement('input') as HTMLInputElement
    this.container.appendChild(this.label)
    this.container.appendChild(this.input)

    this.label.htmlFor = this.id
    this.label.textContent = labelText
    this.input.id = this.id
    this.input.type = this.type
    this.input.addEventListener(
      'change',
      () => context.gain.value = Number(this.input.value)
    )
    this.input.min = this.minValue
    this.input.max = this.maxValue
    this.input.step = this.step
  }

  render (): HTMLElement {
    return this.container
  }
}
