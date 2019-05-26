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
    chai.expect(spy.calledWithExactly('some value', null)).to.equal(true)
    chai.expect(testElem.getAttribute('a')).to.equal('some value')
  })

  it('property becomes no attribute without `attribute`', () => {
    const spy = sinon.spy()
    customElements.define('property-becomes-no-attribute', class extends HTMLPanda {
      static get properties() {
        return { a: { onChange: spy} }
      }
    })

    document.body.innerHTML = '<property-becomes-no-attribute></property-becomes-no-attribute>'
    const testElem = document.querySelector('property-becomes-no-attribute')

    testElem.a = 'some value'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
    chai.expect(testElem.hasAttribute('a')).to.equal(false) 
  })
})
