import Sound from './Sound'

/**
 * Snare sound class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class Snare implements Sound {
  context: AudioContext
  compressor: DynamicsCompressorNode
  frequency: number
  gain: GainNode
  volume: number
  private noise: AudioBufferSourceNode
  private noiseFrequency: number
  private noiseFilter: BiquadFilterType
  private noiseGain: GainNode
  private oscillatorType: OscillatorType
  private oscillator: OscillatorNode
  private oscillatorGain: GainNode

  constructor (context: AudioContext, compressor: DynamicsCompressorNode, frequency: number, noiseFrequency: number, noiseFilter: BiquadFilterType, oscillatorType: OscillatorType) {
    this.context = context
    this.compressor = compressor
    this.frequency = frequency
    this.noiseFrequency = noiseFrequency
    this.noiseFilter = noiseFilter
    this.oscillatorType = oscillatorType
  }

  init (): void {
    this.noiseGain = this.context.createGain()
    this.oscillatorGain = this.context.createGain()
    this.gain = this.context.createGain()
    this.noise = this.context.createBufferSource()
    this.oscillator = this.context.createOscillator()
    const time = this.context.currentTime
    const noiseFilter = this.context.createBiquadFilter()
    this.noise.buffer = this.createNoiseBuffer()
    noiseFilter.type = this.noiseFilter
    noiseFilter.frequency.value = this.noiseFrequency
    this.noise.connect(noiseFilter)
    noiseFilter.connect(this.noiseGain)
    this.noiseGain.connect(this.gain)
    this.oscillator.type = this.oscillatorType
    this.oscillator.connect(this.oscillatorGain)
    this.oscillatorGain.connect(this.gain)
    this.gain.connect(this.compressor)

    this.noiseGain.gain.setValueAtTime(1, time)
    this.noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2)

    this.noise.start(time)

    this.oscillator.frequency.setValueAtTime(this.frequency, time)
    this.gain.gain.setValueAtTime(0.7, time)
    this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1)

    this.oscillator.start(time)

    this.oscillator.stop(time + 0.2)
    this.noise.stop(time + 0.2)
  }

  play (loop: boolean = false, delay: number = 0): void {
    // Not implemented.
  }

  stop (delay: number = 0): void {
    // Not implemented.
  }

  private createNoiseBuffer (): AudioBuffer {
    const bufferSize = this.context.sampleRate
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    return buffer
  }
}
