import React from 'react'
import { Link, graphql } from 'gatsby'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import usePreviewData from '../utils/usePreviewData'
import Layout from '../components/layouts/index'
import { withPreview } from 'gatsby-source-prismic'

export const ProductsTemplate = ({ data }) => {
  if (!data) return null
  const liveData = usePreviewData(data)

  const pageTitle = liveData.allPrismicProducts.nodes[0].data.title.raw

  const pageContent = liveData.allPrismicProduct
  const page = pageContent.edges || {}

  const pageLayout = liveData.prismicLayout.data
  return (
    <Layout layoutData={pageLayout}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Products</title>
      </Helmet>
      <RenderBody products={page} pageTitle={pageTitle} />
    </Layout>
  )
}

export const query = graphql`
  query MyHomeProductsQuery {
    allPrismicProducts {
      nodes {
        data {
          title {
            raw
          }
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
            <RichText render={pageTitle || []} />
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
