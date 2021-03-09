import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import usePreviewData from '../utils/usePreviewData'
import Layout from '../components/layouts/index'
import { withPreview } from 'gatsby-source-prismic'

export const ProductTemplate = ({ data }) => {
  if (!data) return null
  const liveData = usePreviewData(data)
  const pageContent = liveData.prismicProduct
  const page = pageContent.data || {}

  const pageLayout = liveData.prismicLayout.data

  return (
    <Layout layoutData={pageLayout}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{page.title.text}</title>
      </Helmet>
      <RenderBody product={page} />
    </Layout>
  )
}

export const query = graphql`
query ProductQuery($uid: String) {
  prismicProduct(uid: {eq: $uid}) {
    type
    uid
    data {
      product_name {
        raw
        text
      }
      product_image {
        alt
        url
      }
      sub_title {
        raw
        text
      }
      rich_content {
        raw
        text
      }
      button_link {
        url
      }
      button_label {
        raw
        text
      }
      title {
        raw
        text
      }
      product_description {
        raw
        text
      }
      related_products_title {
        raw
        text
      }
      related_products {
        product1 {
          document {
            ... on PrismicProduct {
              id
              data {
                product_image {
                  alt
                  url
                }
                product_name {
                  raw
                  text
                }
                sub_title {
                  raw
                  text
                }
              }
              url
              uid
              type
            }
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
const handleClickAddCart = (event) => {
  event.preventDefault()
  window.alert('we are integrating the GraphQL API at the moment. So, coffee delivery is temporarily unavailable.')
}

const RenderRelatedProducts = ({ related }) => related.map((item) => (
  <div key={item.product1.document.uid} className="products-grid-item-wrapper">
    {item.product1.document.data.product_image ? <img className="products-grid-item-image" src={item.product1.document.data.product_image.url} alt={item.product1.document.data.product_image.alt} /> : ''}
    <p className="products-grid-item-name">
      <Link to={item.product1.document.url}>
        {item.product1.document.data.product_name ? item.product1.document.data.product_name.text : ''}
      </Link>
    </p>
    <p className="products-grid-item-subtitle">{item.product1.document.data.sub_title ? item.product1.document.data.sub_title.text : ''}</p>
  </div>
))

const RenderBody = ({ product }) => (
  <>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <div className="product-sections-wrapper">
      <section>
        <div className="l-wrapper">
          <div className="product-hero-inner">
            {product.product_image ? <img className="product-hero-image" src={product.product_image.url} alt={product.product_image.alt} /> : null}
            <div className="product-hero-content">
              <div className="product-hero-name">
                {product.product_name ? <RichText render={product.product_name.raw || []} /> : ''}
              </div>
              <div className="product-hero-rich-content">
                {product.rich_content ? <RichText render={product.rich_content.raw || []} /> : ''}
              </div>
              <div className="product-hero-button-wrapper">
                <a className="a-button a-button--filled" href={product.button ? product.button_link.url : '#'} onClick={handleClickAddCart}>
                  {product.button_label ? product.button_label.text : ''}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-description">
        <div className="l-wrapper">
          <div className="product-description-title">
            {product.product_name ? <RichText render={product.title.raw || []} /> : ''}
          </div>
          <div className="product-description-content">
            {product.product_name ? <RichText render={product.product_description.raw || []} /> : ''}
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
              {product.related_products_title ? <RichText render={product.related_products_title.raw || []} /> : ''}
            </div>
          </header>
        </div>
        <div className="products-grid-items-wrapper">
          {product.related_products ? <RenderRelatedProducts related={product.related_products} /> : ''}
        </div>
      </section>
    </div>
  </>
)

export default withPreview(ProductTemplate)

