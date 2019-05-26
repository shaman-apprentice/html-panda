export default class HTMLPanda extends HTMLElement {

  static get properties() {
    return {}
  }

  static get observedAttributes() {
    return Object.keys(this.properties)
      .map(key => this.properties[key].attribute)
      .filter(v => v)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this._attriName2Prop[name].onChange(newValue, oldValue)
  }

  constructor() {
    super()

    this._attriName2Prop = {}

    Object.keys(this.constructor.properties).forEach(prop => {
      const attriName = this.constructor.properties[prop].attribute || prop
      this._attriName2Prop[attriName] = this.constructor.properties[prop]
    })
  }
}