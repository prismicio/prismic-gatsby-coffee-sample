import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { withPreview } from '@prismicio/gatsby-source-prismic-graphql'
import { Link } from 'gatsby'
import Layout from '../components/layouts'

class ProductsHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: this.props.pageContext.data,
      products: this.props.pageContext.extra
    }
  }

  renderProductList() {
    return this.state.products.map((item) =>
      <div key={item.node._meta.uid} className="products-grid-item-wrapper">
        <Link to={linkResolver(item.node._meta)}>
          <img className="products-grid-item-image" src={item.node.product_image.url} alt={item.node.product_image.alt}/>
          <p className="products-grid-item-name">
              {RichText.asText(item.node.product_name)}
          </p>
        </Link>
        <p className="products-grid-item-subtitle">{RichText.asText(item.node.sub_title)}</p>
      </div>
    )
  }

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="products-section">
          <div className="l-wrapper">
            <header className="products-grid-header">
              <div className="products-grid-header-title">
                {RichText.render(this.state.doc.title, linkResolver)}
              </div>
            </header>
          </div>
          <div className="products-grid-items-wrapper">
            {this.renderProductList()}
          </div>
        </section>

        <div data-wio-id={this.state.doc._meta.id}></div>
      </React.Fragment>
    )
  }


  render() {
    return (
      <Layout>
        {this.renderBody()}
      </Layout>
    );
  }
}

export default withPreview(ProductsHome)