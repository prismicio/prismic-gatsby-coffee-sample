import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layouts'

export const query = graphql`
query ProductQuery($uid: String) {
  prismic{
    allProducts(uid: $uid){
      edges{
        node{
          _meta{
            type
            id
            uid
          }
          product_name
          product_image
          sub_title
          rich_content
          button_link{
            __typename
            ... on PRISMIC__ExternalLink{
              url
            }
          }
          button_label
          title
          product_description
          related_products_title
          related_products{
            product1{
              __typename
              ... on PRISMIC_Product{
                product_image
                product_name
                sub_title
                _meta{
                  uid
                  id
                  type
                }
              }
            }
          }
        }
      }
    }
  }
}
`
function handleClickAddCart(event) {
  event.preventDefault()
  window.alert(`No. Not today.\nWe're integrating the GraphQL API at the moment, so coffee delivery is temporarily unavailable.`)
}

const RenderRelatedProducts = ({ related }) => {
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

const RenderBody = ({ product }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <div className="product-sections-wrapper">
      <section>
        <div className="l-wrapper">
          <div className="product-hero-inner">
            <img className="product-hero-image" src={product.product_image.url} alt={product.product_image.alt} />
            <div className="product-hero-content">
              <div className="product-hero-name">
                {RichText.render(product.product_name, linkResolver)}
              </div>
              <div className="product-hero-rich-content">
                {RichText.render(product.rich_content, linkResolver)}
              </div>
              <div className="product-hero-button-wrapper">
                <a className="a-button a-button--filled" href={product.button_link.url} onClick={handleClickAddCart}>
                  {RichText.asText(product.button_label)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-description">
        <div className="l-wrapper">
          <div className="product-description-title">
            {RichText.render(product.title, linkResolver)}
          </div>
          <div className="product-description-content">
            {RichText.render(product.product_description, linkResolver)}
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
              {RichText.render(product.related_products_title, linkResolver)}
            </div>
          </header>
        </div>
        <div className="products-grid-items-wrapper">
          <RenderRelatedProducts related={product.related_products} />
        </div>
      </section>

    </div>

    <div data-wio-id={product._meta.id}></div>
  </React.Fragment>
)

const Product = props => {
  const doc = props.data.prismic.allProducts.edges.slice(0,1).pop();
  if(!doc) return null;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{RichText.asText(doc.node.product_name)}</title>
      </Helmet>
      <RenderBody product={doc.node} />
    </Layout>
  )
}

export default Product