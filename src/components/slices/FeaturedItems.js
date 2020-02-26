import React from 'react'
import { Link } from 'gatsby'
import { RichText } from 'prismic-reactjs'

const renderProducts = (slice) => slice.items.map((item, index) => {
  const product = item.link_to_product.document.data
  return (
    <div key={index} className="products-grid-item-wrapper">
      <img
        className="products-grid-item-image"
        src={product.product_image.url}
        alt={product.product_image.alt}
      />
      <p className="products-grid-item-name">
        <Link to={item.link_to_product.document.url}>{product.product_name.text}</Link>
      </p>
      <p className="products-grid-item-subtitle">{product.sub_title.text}</p>
    </div>
  )
})

export default ({ slice }) => (
  <section>
    <div className="l-wrapper">
      <header className="products-grid-header">
        <div className="products-grid-header-title">
          <RichText
            render={slice.primary.section_title.raw || []}
          />
        </div>
        <div className="products-grid-header-button-wrapper">
          <Link className="a-button" to={slice.primary.button_link.url}>
            {slice.primary.button_label.text}
          </Link>
        </div>
      </header>
    </div>
    <div className="products-grid-items-wrapper">{renderProducts(slice)}</div>
  </section>
)
