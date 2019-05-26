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

    Object.keys(this.constructor.properties).forEach(propName => { // defining in `constructor` and not in `static get observedAttributes` because setter must access `this.setAttribute`
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

  connectedCallback() {
    Object.keys(this.constructor.properties).forEach(propName => {
      const propDescr = this.constructor.properties[propName]
      if (!propDescr.hasOwnProperty('defaultValue'))
        return

      if (propDescr.attribute && this.hasAttribute(propDescr.attribute))
        return

      this[propName] = propDescr.defaultValue
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    const propName = this._attriName2PropName[name] 
    if (!isSame(this[propName], newValue))
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

      if (value === undefined)
        instance.removeAttribute(propDescr.attribute)
      else if (value === null)
        instance.setAttribute(propDescr.attribute, '')
      else
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

function isSame(thisValue, newValue) {
  return thisValue === newValue
    || thisValue === undefined && newValue === null
    || thisValue === null && newValue === ''
}