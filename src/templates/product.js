import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { Link } from 'gatsby'
import { withPreview } from '@prismicio/gatsby-source-prismic-graphql'
import { Helmet } from 'react-helmet'

import Layout from '../components/layouts'

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: this.props.pageContext.data
    }
  }

  handleClickAddCart(event) {
    event.preventDefault()
    window.alert(`No. Not today.\nWe're integrating the GraphQL API at the moment, so coffee delivery is temporarily unavailable.`)
  }

  renderRelatedProducts(related) {
    return related.map((item) =>
      <div key={item.product1._meta.uid} className="products-grid-item-wrapper">
        <img className="products-grid-item-image" src={item.product1.product_image.url} alt={item.product1.product_image.alt}/>
        <p className="products-grid-item-name">
          <Link to={linkResolver(item.product1._meta)}>
            {RichText.asText(item.product1.product_name)}
          </Link>
        </p>
        <p className="products-grid-item-subtitle">{RichText.asText(item.product1.sub_title)}</p>
      </div>
    )
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <div className="product-sections-wrapper">

          <section>
            <div className="l-wrapper">
              <div className="product-hero-inner">
                <img className="product-hero-image" src={this.state.doc.product_image.url} alt={this.state.doc.product_image.alt} />
                <div className="product-hero-content">
                  <div className="product-hero-name">
                    {RichText.render(this.state.doc.product_name, linkResolver)}
                  </div>
                  <div className="product-hero-rich-content">
                    {RichText.render(this.state.doc.rich_content, linkResolver)}
                  </div>
                  <div className="product-hero-button-wrapper">
                    <a className="a-button a-button--filled" href={this.state.doc.button_link.url} onClick={this.handleClickAddCart}>
                      {RichText.asText(this.state.doc.button_label)}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="product-description">
            <div className="l-wrapper">
              <div className="product-description-title">
                {RichText.render(this.state.doc.title, linkResolver)}
              </div>
              <div className="product-description-content">
                {RichText.render(this.state.doc.product_description, linkResolver)}
              </div>
            </div>
          </section>

          <div className="product-separator-wrapper">
            <div className="l-wrapper">
              <hr className="separator-hr" />
            </div>
          </div>

          <section>
            <div className="l-wrapper">
              <header className="products-grid-header">
                <div className="products-grid-header-title">
                  {RichText.render(this.state.doc.related_products_title, linkResolver)}
                </div>
              </header>
            </div>
            <div className="products-grid-items-wrapper">
              {this.renderRelatedProducts(this.state.doc.related_products)}
            </div>
          </section>

        </div>

        <div data-wio-id={this.state.doc._meta.id}></div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{RichText.asText(this.state.doc.product_name)}</title>
        </Helmet>
        {this.renderBody()}
      </Layout>
    );
  }
}

export default withPreview(Product)