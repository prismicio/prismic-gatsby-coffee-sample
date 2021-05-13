import React from 'react'
import { Link, graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import Layout from '../components/layouts/index'

export const ProductsTemplate = ({ data }) => {
  if (!data) return null
  const page = data.allPrismicProduct.edges || {}
  const pageMeta = data.prismicProducts.data
  const pageLayout = data.prismicLayout.data
  return (
    <Layout
      layoutData={pageLayout}
      title={pageMeta.meta_title.text}
      description={pageMeta.meta_description.text}
    >
      <RenderBody products={page} pageTitle={pageMeta.title.text} />
    </Layout>
  )
}

export const query = graphql`
  query MyHomeProductsQuery {
    prismicProducts {
      data {
        title {
          text
        }
        meta_title {
          text
        }
        meta_description {
          text
        }
      }
    }
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

const RenderProductList = ({ products }) => products.map((product) => (
  <div key={product.node.uid} className="products-grid-item-wrapper">
    <Link to={product.node.url}>
      <img
        className="products-grid-item-image"
        src={product.node.data.product_image.url}
        alt={product.node.data.product_image.alt}
      />
      <p className="products-grid-item-name">
        {product.node.data.product_name.text}
      </p>
    </Link>
    <p className="products-grid-item-subtitle">
      {product.node.data.sub_title.text}
    </p>
  </div>
))

const RenderBody = ({ products, pageTitle }) => (
  <section>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>
    <section className="products-section">
      <div className="l-wrapper">
        <header className="products-grid-header">
          <div className="products-grid-header-title">
            {pageTitle || []}
          </div>
        </header>
      </div>
      <div className="products-grid-items-wrapper">
        <RenderProductList products={products} />
      </div>
    </section>
  </section>
)

export default withPreview(ProductsTemplate)
