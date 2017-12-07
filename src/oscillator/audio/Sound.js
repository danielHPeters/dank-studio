export default class Sound {
  constructor (context, compressor, frequency = 200, type = 'square') {
    this.context = context
    this.compressor = compressor
    this.frequency = frequency
    this.type = type
  }

  connectAndStart () {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.compressor)
    this.oscillator.type = this.type
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.gainNode)
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime)
    this.gainNode.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.1)
    this.oscillator.start(0.5)
  }

  stopAndDisconnect () {
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.8)
    this.oscillator.stop(this.context.currentTime + 2.8)
  }
}
