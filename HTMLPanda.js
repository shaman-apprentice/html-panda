export default class HTMLPanda extends HTMLElement {

  static get properties() {
    return {}
  }

  static get observedAttributes() {
    return Object.keys(this.properties)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.constructor.properties[name].onChange(newValue, oldValue)
  }

  constructor() {
    super()

    Object.keys(this.constructor.properties).forEach(prop => {

    })
  }
}