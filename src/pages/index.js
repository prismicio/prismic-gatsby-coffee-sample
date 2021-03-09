import React from 'react'
import { RichText } from 'prismic-reactjs'
import { graphql } from 'gatsby'
import { withPreview } from 'gatsby-source-prismic'
import {
  CTABanner, FeaturedItems, NumberedItems, Separator, TextBlock,
} from '../components/slices'
import Layout from '../components/layouts/index'

export const HomeTemplate = ({ data }) => {
  if (!data) return null

  const pageContent = data.allPrismicHomepage
  const page = pageContent.edges[0].node || {}

  const pageLayout = data.prismicLayout.data
  return (
    <Layout layoutData={pageLayout}>
      <RenderBody home={page} />
    </Layout>
  )
}

export const query = graphql`
  query MyHomePageQuery {
    allPrismicHomepage {
      edges {
        node {
          id
          type
          url
          data {
            title {
              raw
              text
            }
            banner_text {
              raw
              text
            }
            banner_image {
              url
              alt
            }
            body {
              ... on PrismicHomepageBodyFeaturedItems {
                slice_type
                primary {
                  section_title {
                    text
                    raw
                  }
                  button_label {
                    text
                    raw
                  }
                  button_link {
                    uid
                    id
                    type
                    url
                  }
                }
                items {
                  link_to_product {
                    document {
                      ... on PrismicProduct {
                        url
                        uid
                        id
                        type
                        data {
                          product_image {
                            alt
                            url
                          }
                          sub_title {
                            raw
                            text
                          }
                          product_name {
                            text
                            raw
                          }
                        }
                      }
                    }
                  }
                }
              }
              ... on PrismicHomepageBodyCtaBanner {
                slice_type
                primary {
                  image_banner {
                    url
                    alt
                  }
                  banner_title {
                    raw
                    text
                  }
                  banner_text {
                    raw
                    text
                  }
                  cta_label
                  cta_link {
                    url
                  }
                }
              }
              ... on PrismicHomepageBodyBigBulletItem {
                slice_type
                id
                primary {
                  title_section {
                    raw
                    text
                  }
                }
                items {
                  description_paragraph {
                    raw
                    text
                  }
                }
              }
              ... on PrismicHomepageBodySeparator {
                slice_type
              }
              ... on PrismicHomepageBodyTextBlock {
                id
                slice_type
                primary {
                  title1 {
                    raw
                    text
                  }
                  paragraph {
                    text
                    raw
                  }
                }
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

const RenderSlices = ({ slices }) => (slices.map((slice, index) => {
  // eslint-disable-next-line consistent-return
  const res = (() => {
    switch (slice.slice_type) {
      case 'cta_banner': return (
        <div key={index} className="homepage-slice-wrapper">
          <CTABanner slice={slice} />
        </div>
      )

      case 'featured_items': return (
        <div key={index} className="homepage-slice-wrapper">
          <FeaturedItems slice={slice} />
        </div>
      )

      case 'big_bullet_item': return (
        <div key={index} className="homepage-slice-wrapper">
          <NumberedItems slice={slice} />
        </div>
      )

      case 'separator': return (
        <div key={index} className="homepage-slice-wrapper">
          <Separator />
        </div>
      )

      case 'text_block': return (
        <div key={index} className="homepage-slice-wrapper">
          <TextBlock slice={slice} />
        </div>
      )

      default:
    }
  })()
  return res
}))

const RenderBody = ({ home }) => (
  <>
    <header className="homepage-header">
      <div className="l-wrapper">
        <div className="homepage-header-title">
          <RichText
            render={home.data.title.raw || []}
          />
        </div>
      </div>
    </header>

    <section className="homepage-banner">
      <img className="homepage-banner-image" src={home.data.banner_image.url} alt={home.data.banner_image.alt} />
      <div className="homepage-banner-box-wrapper">
        <div className="homepage-banner-box">
          <RichText
            render={home.data.banner_text.raw || []}
          />
        </div>
      </div>
    </section>

    <div className="homepage-slices-wrapper">
      <RenderSlices slices={home.data.body} />
    </div>
  </>
)

export default withPreview(HomeTemplate)
