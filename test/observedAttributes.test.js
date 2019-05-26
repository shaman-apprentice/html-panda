import HTMLPanda from '../HTMLPanda.js'

describe('observedAttributes', () => {
  // seems like observedAttributes is called with some black magic / reflection and hence spying fails
  it.skip('`static get observedAttributes` returns keys of overwritten `static get properties`', () => {
    customElements.define('oberved-attribute-keys', class extends HTMLPanda {
      static get properties() {
        return { a: undefined, b: undefined }
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
        return { attr: { onChange: spy } }
      }
    })

    document.body.innerHTML = '<oberved-attribute-on-change attr="some value"></oberved-attribute-on-change>'

    chai.expect(spy.callCount).to.equal(1)
    chai.expect(spy.calledWithExactly('some value', null)).to.equal(true)
  })
})