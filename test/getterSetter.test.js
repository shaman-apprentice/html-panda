import HTMLPanda from '../HTMLPanda.js'

describe('getter / setter', () => {
  it('attribute becomes property', () => {
    customElements.define('attribute-becomes-property', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a' } }
      }
    })

    document.body.innerHTML = '<attribute-becomes-property a="some value"></attribute-becomes-property>'

    chai.expect(document.querySelector('attribute-becomes-property').a).to.equal('some value')
  })

  it('property becomes attribute', () => {
    customElements.define('property-becomes-attribute', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a' } }
      }
    })

    document.body.innerHTML = '<property-becomes-attribute></property-becomes-attribute>'
    const testElem = document.querySelector('property-becomes-attribute')

    testElem.a = 'some value'

    chai.expect(testElem.getAttribute('a')).to.equal('some value')
  })

  it('`onChange` gets called on property change', () => {
    const spy = sinon.spy()
    customElements.define('on-change-on-prop-change', class extends HTMLPanda {
      static get properties() {
        return { a: { onChange: spy } }
      }
    })

    document.body.innerHTML = '<on-change-on-prop-change></on-change-on-prop-change>'
    const testElem = document.querySelector('on-change-on-prop-change')

    testElem.a = 'some value'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
  })

  it('with onChange and attribute', () => {
    const spy = sinon.spy()
    customElements.define('on-change-and-attri-set-prop', class extends HTMLPanda {
      static get properties() {
        return { a: { onChange: spy, attribute: 'a' } }
      }
    })

    document.body.innerHTML = '<on-change-and-attri-set-prop></on-change-and-attri-set-prop>'
    const testElem = document.querySelector('on-change-and-attri-set-prop')

    testElem.a = 'some value'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
    chai.expect(testElem.getAttribute('a')).to.equal('some value')
  })

  it('property becomes no attribute without `attribute`', () => {
    const spy = sinon.spy()
    customElements.define('property-becomes-no-attribute', class extends HTMLPanda {
      static get properties() {
        return { a: { onChange: spy } }
      }
    })

    document.body.innerHTML = '<property-becomes-no-attribute></property-becomes-no-attribute>'
    const testElem = document.querySelector('property-becomes-no-attribute')

    testElem.a = 'some value'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
    chai.expect(testElem.hasAttribute('a')).to.equal(false) 
  })

  it('set property to undefined removes the attribute', () => {
    customElements.define('property-undefined-removes-attribute', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a' } }
      }
    })

    document.body.innerHTML = '<property-undefined-removes-attribute a="abc"></property-undefined-removes-attribute>'
    const testElem = document.querySelector('property-undefined-removes-attribute')

    chai.expect(testElem.getAttribute('a')).to.equal('abc')

    testElem.a = undefined
    chai.expect(testElem.hasAttribute('a')).to.equal(false)
  })

  it('set property to null sets the attribute to empty String', () => {
    customElements.define('property-null-sets-attribute-empty-str', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a' } }
      }
    })

    document.body.innerHTML = '<property-null-sets-attribute-empty-str a="abc"></property-null-sets-attribute-empty-str>'
    const testElem = document.querySelector('property-null-sets-attribute-empty-str')

    chai.expect(testElem.getAttribute('a')).to.equal('abc')

    testElem.a = null
    chai.expect(testElem.getAttribute('a')).to.equal('')
  })

  it('set property to undefined activates `onChange` once', () => {
    const spy = sinon.spy()
    customElements.define('property-undefined-activates-on-change-once', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a', onChange: spy } }
      }
    })

    document.body.innerHTML = '<property-undefined-activates-on-change-once a="abc"></property-undefined-activates-on-change-once>'
    const testElem = document.querySelector('property-undefined-activates-on-change-once')

    chai.expect(testElem.getAttribute('a')).to.equal('abc')

    testElem.a = undefined
    chai.expect(spy.callCount).to.equal(2) // one initial and one to undefined

  })

  it('set property to null activates `onChange` once', () => {
    const spy = sinon.spy()
    customElements.define('property-null-activates-on-change-once', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a', onChange: spy } }
      }
    })

    document.body.innerHTML = '<property-null-activates-on-change-once a="abc"></property-null-activates-on-change-once>'
    const testElem = document.querySelector('property-null-activates-on-change-once')

    chai.expect(testElem.getAttribute('a')).to.equal('abc')

    testElem.a = null
    chai.expect(spy.callCount).to.equal(2) // one initial and one to null
  })
})
