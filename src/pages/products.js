import React from 'react'
import { Link, graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import { withPreview } from 'gatsby-source-prismic'
import Layout from '../components/layouts'

const ProductsTemplate = ({ data }) => {
  if (!data) return null
  const pageContent = data.allPrismicProduct
  const page = pageContent.edges || {}

  const pageLayout = data.prismicLayout.data
  return (
    <Layout layoutData={pageLayout}>
      <Helmet>
        <meta charSet="utf-8" />
        {page.map((item, i) => (
          <title key={i}>{item.node.data.title.text}</title>
        ))}
      </Helmet>
      <RenderBody products={page} />
    </Layout>
  )
}

export const query = graphql`
  query MyHomeProductsQuery {
    allPrismicProduct {
      edges {
        node {
          uid
          type
          url
          id
          data {
            title {
              text
              raw
            }
            meta_title {
              text
              raw
            }
            meta_description {
              raw
              text
            }
            product_name {
              raw
              text
            }
            product_image {
              alt
              url
            }
            sub_title {
              text
              raw
            }
          }
        }
      }
    }
    prismicLayout {
      ...LayoutFragment
    }
  }
`

const RenderProductList = ({ products }) => (
  <div key={products.node.uid} className="products-grid-item-wrapper">
    <Link to={products.node.url}>
      <img
        className="products-grid-item-image"
        src={products.node.data.product_image.url}
        alt={products.node.data.product_image.alt}
      />
      <p className="products-grid-item-name">
        {products.node.data.product_name.text}
      </p>
    </Link>
    <p className="products-grid-item-subtitle">
      {products.node.data.sub_title.text}
    </p>
  </div>
)

const RenderBody = ({ products }) => products.map((item, i) => (
  <section key={i}>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <section className="products-section">
      <div className="l-wrapper">
        <header className="products-grid-header">
          <div className="products-grid-header-title">
            <RichText
              render={item.node.data.title.raw || []}
            />
          </div>
        </header>
      </div>
      <div className="products-grid-items-wrapper">
        <RenderProductList products={item} />
      </div>
    </section>
  </section>
))

export default withPreview(ProductsTemplate)
