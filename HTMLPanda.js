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
    if (newValue !== this[propName])
      this[propName] = newValue 
  }
}

function getSetter(instance, propName, propDescr) {
  let setter = value => {
    if (instance['_' + propName] === value)
      return

    return instance['_' + propName] = value
  }

  if (propDescr.attribute) {
    const prevSetter = setter
    setter = value => {
      prevSetter(value)
      instance.setAttribute(propDescr.attribute, value)
    }
  }

  if (propDescr.onChange) {
    const prevSetter = setter
    setter = value => {
      const oldValue = instance['_' + propName]
      prevSetter(value)
      propDescr.onChange(value, oldValue)
    }
  }

  return setter
}
