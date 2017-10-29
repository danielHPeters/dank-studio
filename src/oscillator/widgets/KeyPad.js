export default class KeyPad {
  constructor (id, keyBoard) {
    this.id = id
    this.element = document.getElementById(this.id)
    this.keyBoard = keyBoard
  }

  addKey (id, text) {
    let newKey = document.createElement('li')
    let span = document.createElement('span')
    let textNode = document.createTextNode(id)
    let textNode2 = document.createTextNode(text)
    let lineBreak = document.createElement('br')
    span.appendChild(textNode)
    span.appendChild(lineBreak)
    span.appendChild(textNode2)
    span.classList.add('keyDescription')
    newKey.appendChild(span)
    newKey.classList.add('key')
    newKey.setAttribute('id', id)
    newKey.addEventListener('mouseenter', event => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('touchstart', event => this.keyBoard.setDownEvent(id))
    newKey.addEventListener('mouseleave', event => this.keyBoard.setUpEvent(id))
    newKey.addEventListener('touchend', event => this.keyBoard.setUpEvent(id))
    this.element.appendChild(newKey)
  }

  addAllKeys () {
    Object.keys(this.keyBoard.keyActionMap).forEach(key => {
      this.addKey(key, this.keyBoard.keyActionMap[key].frequency)
    })
  }
}
