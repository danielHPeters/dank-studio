export default class KeyPad {
  constructor (id) {
    this.id = id
    this.element = document.getElementById(this.id)
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
    this.element.appendChild(newKey)
  }
}
