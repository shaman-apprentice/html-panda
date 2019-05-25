import HTMLPanda from '../HTMLPanda.js'

describe('overwriting of `static get properties`', () => {
  let htmlPandaPropertiesSpy
  
  beforeEach(() => {
    htmlPandaPropertiesSpy = sinon.spy(HTMLPanda, 'properties', ['get'])
  })

  afterEach(() => {
    htmlPandaPropertiesSpy.restore()
  })

  it('calls HTMLPanda`s static get properties if not overwritten', () => {
    customElements.define('plain-static-get-properties-from-panda', class A extends HTMLPanda {})
    document.body.innerHTML = '<plain-static-get-properties-from-panda></plain-static-get-properties-from-panda>'
    
    chai.expect(htmlPandaPropertiesSpy.get.callCount).to.equal(1)
  })

  it('calls only custom static get properties', () => {
    class ExtendingGetProperties extends HTMLPanda {
      static get properties() {
        return []
      }
    }

    customElements.define('panda-ext-properites', ExtendingGetProperties)

    const customPropertiesSpy = sinon.spy(ExtendingGetProperties, 'properties', ['get'])
    document.body.innerHTML = '<panda-ext-properites></panda-ext-properites>'

    chai.expect(htmlPandaPropertiesSpy.get.callCount).to.equal(0)
    chai.expect(customPropertiesSpy.get.callCount).to.equal(1)
  })
})