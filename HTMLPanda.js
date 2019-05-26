export default class HTMLPanda extends HTMLElement {

  static get properties() {
    return {}
  }

  static get observedAttributes() {
    return Object.keys(this.properties)
      .map(key => this.properties[key].attribute)
      .filter(v => v)
  }

  constructor() {
    super()

    this._attriName2PropName = {}

    Object.keys(this.constructor.properties).forEach(propName => {
      const propDescr = this.constructor.properties[propName]

      if (propDescr.attribute)
        this._attriName2PropName[propDescr.attribute] = propName

      Object.defineProperty(this.constructor.prototype, propName, {
        enumerable: true,
        get: () => this['_' + propName],
        set: getSetter(this, propName, propDescr), 
      })
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const propName = this._attriName2PropName[name] 
    this["_" + propName] = newValue 
    if (this.constructor.properties[propName].onChange)
      this.constructor.properties[propName].onChange(newValue, oldValue)
  }
}

function getSetter(instance, propName, propDescr) {
  let setter = value =>
    instance['_' + propName] = value

  if (propDescr.attribute) {
    const prevSetter = setter
    setter = value => {
      instance.setAttribute(propDescr.attribute, value)
      prevSetter(value)
    }
  }

  // onChange gets also called in attributeChangeCallback
  // note that unset value is undefined or null depending if called from property change or attribute change
  if (propDescr.onChange && !propDescr.attribute) {
    const prevSetter = setter
    setter = value => {
      const oldValue = instance['_' + propName]
      prevSetter(value)
      propDescr.onChange(value, oldValue)
    }
  }

  return setter
}
