import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

function renderProducts(slice) {
  return slice.fields.map((item, index) =>
    <div key={index} className="products-grid-item-wrapper">
      <img className="products-grid-item-image" src={item.link_to_product.product_image.url} alt={item.link_to_product.product_image.alt}/>
      <p className="products-grid-item-name">
        <Link to={linkResolver(item.link_to_product._meta)}>
          {RichText.asText(item.link_to_product.product_name)}
        </Link>
      </p>
      <p className="products-grid-item-subtitle">{RichText.asText(item.link_to_product.sub_title)}</p>
    </div>
  )
}
export default ({ slice }) =>
  <section>
    <div className="l-wrapper">
      <header className="products-grid-header">
        <div className="products-grid-header-title">
          {RichText.render(slice.primary.section_title, linkResolver)}
        </div>
        <div className="products-grid-header-button-wrapper">
          <Link className="a-button" to={linkResolver(slice.primary.button_link._meta)}>
            {RichText.asText(slice.primary.button_label)}
          </Link>
        </div>
      </header>
    </div>
    <div className="products-grid-items-wrapper">
      {renderProducts(slice)}
    </div>
  </section>
