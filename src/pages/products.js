import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layouts'

export const query = graphql`
{
  prismic{
    allProductss(uid:null){
      edges{
        node{
          title
          meta_title
          meta_description
          _meta{
            uid
            id
            type
          }
        }
      }
    }
    allProducts{
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
        }
      }
    }
  }
}
`

const RenderProductList = ({ products }) => {
  return products.map((item) =>
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

const RenderBody = ({ productHome, products }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <section className="products-section">
      <div className="l-wrapper">
        <header className="products-grid-header">
          <div className="products-grid-header-title">
            {RichText.render(productHome.title, linkResolver)}
          </div>
        </header>
      </div>
      <div className="products-grid-items-wrapper">
        <RenderProductList products={products} />
      </div>
    </section>

    <div data-wio-id={productHome._meta.id}></div>
  </React.Fragment>
)


export default ({ data }) => {
  const doc = data.prismic.allProductss.edges.slice(0,1).pop();
  if(!doc) return null;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{RichText.asText(doc.node.title)}</title>
      </Helmet>
      <RenderBody productHome={doc.node} products={data.prismic.allProducts.edges} />
    </Layout>
  );
}

