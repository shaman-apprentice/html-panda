import HTMLPanda from '../HTMLPanda.js'

describe('default values', () => {
  it('default value gets set', () => {
    customElements.define('default-value-gets-set', class extends HTMLPanda {
      static get properties() {
        return { a: { defaultValue: 'my default value' } }
      }
    })

    document.body.innerHTML = '<default-value-gets-set></default-value-gets-set>'

    chai.expect(document.querySelector('default-value-gets-set').a).to.equal('my default value')
  })

  it('default value gets not set when it has the attribute in DOM', () => {
    customElements.define('default-value-gets-not-set-with-attri-in-dom', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a', defaultValue: 'my default value' } }
      }
    })

    document.body.innerHTML = '<default-value-gets-not-set-with-attri-in-dom a="DOM default"></default-value-gets-not-set-with-attri-in-dom>'

    chai.expect(document.querySelector('default-value-gets-not-set-with-attri-in-dom').a).to.equal('DOM default')
  })

  it('default value sets also the attribute', () => {
    customElements.define('default-value-sets-attribute', class extends HTMLPanda {
      static get properties() {
        return { a: { attribute: 'a', defaultValue: 'my default value' } }
      }
    })

    document.body.innerHTML = '<default-value-sets-attribute></default-value-sets-attribute>'
    const testElem = document.querySelector('default-value-sets-attribute')

    chai.expect(testElem.getAttribute('a')).to.equal('my default value')
  })
})