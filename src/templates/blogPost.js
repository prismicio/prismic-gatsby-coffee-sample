import React from 'react'
import { RichText } from 'prismic-reactjs'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import usePreviewData from '../utils/usePreviewData'
import Layout from '../components/layouts/index'

export const BlogPostTemplate = ({ data }) => {
  if (!data) return null
  const liveData = usePreviewData(data)

  const pageContent = liveData.prismicBlogPost
  const page = pageContent.data || {}

  const pageLayout = liveData.prismicLayout.data

  return (
    <Layout layoutData={pageLayout}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{page.title.text}</title>
      </Helmet>
      <RenderBody blogPost={page} />
    </Layout>
  )
}

export const query = graphql`
  query MyBlogpostQuery($uid: String) {
    prismicBlogPost(uid: { eq: $uid }) {
      data {
        author {
          id
          document {
            ... on PrismicAuthor {
              id
              data {
                name {
                  raw
                  text
                }
                bio {
                  raw
                  text
                }
                picture {
                  alt
                  url
                }
              }
            }
          }
        }
        image {
          alt
          url
        }
        title {
          raw
          text
        }
        rich_content {
          raw
        }
      }
    }
    prismicLayout {
      ...LayoutFragment
    }
  }
`

const RenderBody = ({ blogPost }) => (
  <>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <article className="blog-post-article">
      <div className="blog-post-inner">
        <div className="blog-post-image-wrapper">
          {blogPost.image ? (
            <img
              className="blog-post-image"
              src={blogPost.image.url}
              alt={blogPost.image.alt}
            />
          ) : null}
        </div>
        <div className="blog-post-title">
          {blogPost.title ? (
            <RichText
              render={blogPost.title.raw || []}
            />
          ) : (
            ''
          )}
        </div>
        <div className="blog-post-rich-content">
          {blogPost.excerpt ? (
            <RichText
              render={blogPost.rich_content.raw || []}
            />
          ) : (
            ''
          )}
        </div>
        <div className="blog-post-author-wrapper">
          {blogPost.author && blogPost.author.picture ? (
            <img
              className="blog-post-author-picture"
              src={blogPost.author.picture.url}
              alt={blogPost.author.picture.alt}
            />
          ) : (
            ''
          )}
          <div>
            {blogPost.author && blogPost.author.name ? (
              <p className="blog-post-author-name">
                {RichText.asText(blogPost.author.name.text)}
              </p>
            ) : (
              ''
            )}
            {blogPost.author && blogPost.author.bio ? (
              <p className="blog-post-author-bio">
                {RichText.asText(blogPost.author.bio.text)}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </article>
  </>
)

export default BlogPostTemplate
