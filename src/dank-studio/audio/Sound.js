export default class Sound {
  constructor (context, frequency = 200, type = 'sine') {
    this.context = context
    this.frequency = frequency
    this.type = type
  }

  connectAndStart () {
    this.oscillator = this.context.createOscillator()
    this.gainNode = this.context.createGain()
    this.gainNode.connect(this.context.destination)
    this.oscillator.type = this.type
    this.oscillator.frequency.value = this.frequency
    this.oscillator.connect(this.gainNode)
    this.gainNode.gain.setValueAtTime(0, this.context.currentTime)
    this.gainNode.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.1)
    this.oscillator.start(0)
  }

  stopAndDisconnect () {
    this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.6)
    this.oscillator.stop(this.context.currentTime + 1.6)
  }
}
