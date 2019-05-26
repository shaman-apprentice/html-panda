import HTMLPanda from '../HTMLPanda.js'

describe('observedAttributes', () => {
  // seems like observedAttributes is called with some black magic / reflection and hence spying fails
  it.skip('`static get observedAttributes` returns keys of overwritten `static get properties`', () => {
    customElements.define('oberved-attribute-keys', class extends HTMLPanda {
      static get properties() {
        return { a: {}, b: {} }
      }
    })

    const observedAttributesSpy = sinon.spy(HTMLPanda, 'observedAttributes', ['get'])

    document.body.innerHTML = '<oberved-attribute-keys></oberved-attribute-keys>'

    chai.expect(observedAttributesSpy.get.callCount).to.equal(1)
    chai.expect(observedAttributesSpy.get.returned(['a', 'b'])).to.equal(true)
  })

  it('`onChange` gets called with correct values', () => {
    const spy = sinon.spy()
    customElements.define('oberved-attribute-on-change', class extends HTMLPanda {
      static get properties() {
        return { attri: { onChange: spy, attribute: 'attri' } }
      }
    })

    document.body.innerHTML = '<oberved-attribute-on-change attri="some value"></oberved-attribute-on-change>'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
  })

  it('`onChange` works with attribute with dash in name', () => {
    const spy = sinon.spy()
    customElements.define('oberved-attribute-with-dash-on-change', class extends HTMLPanda {
      static get properties() {
        return { someAttri: { attribute: 'some-attri', onChange: spy } }
      }
    }) 

    document.body.innerHTML = '<oberved-attribute-with-dash-on-change some-attri="some value"></oberved-attribute-with-dash-on-change>'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', undefined)).to.equal(true)
  })

  it('`onChange` with boolean attribute', () => {
    const spy = sinon.spy()
    customElements.define('oberved-attribute-boolean', class extends HTMLPanda {
      static get properties() {
        return { attri: { attribute: 'attri', onChange: spy } }
      }
    }) 

    document.body.innerHTML = '<oberved-attribute-boolean attri></oberved-attribute-with-boolean>'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('', undefined)).to.equal(true)
  })

  it('`onChange` gets not called without attribute', () => {
    const spy = sinon.spy()
    customElements.define('no-oberved-attribute', class extends HTMLPanda {
      static get properties() {
        return { prop: { onChange: spy } }
      }
    }) 

    document.body.innerHTML = '<no-oberved-attribute prop></no-oberved-attribute>'

    chai.expect(spy.called).to.equal(false)
  })
})