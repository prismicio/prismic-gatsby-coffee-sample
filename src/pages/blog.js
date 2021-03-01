import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { withPreview } from 'gatsby-source-prismic'
import Layout from '../components/layouts/index'

const BlogTemplate = ({ data }) => {
  if (!data) return null
  const pageContent = data.allPrismicBlogPost
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
      <RenderBody posts={page} />
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allPrismicBlogPost {
      edges {
        node {
          uid
          id
          type
          url
          data {
            title {
              raw
              text
            }
            rich_content {
              raw
              text
            }
            image {
              alt
              url
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

const RenderPosts = ({ posts }) => posts.map((item) => {
  const post = item.node.data
  return (
    <div key={item.node.uid} className="blog-home-post-wrapper">
      {' '}
      <article>
        <img
          className="blog-home-post-image"
          src={post.image.url}
          alt={post.image.alt}
        />
        <p className="blog-home-post-title">{post.title.text}</p>
        <p className="blog-home-post-excerpt">
          {post.rich_content.text.substring(0, 158)}
          {' '}
          …
        </p>
        <div className="blog-home-post-button-wrapper">
          <Link className="a-button" to={item.node.url}>
            Read post
          </Link>
        </div>
      </article>
    </div>
  )
})

const RenderBody = ({ posts }) => (
  <>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <section className="blog-home-section">
      <div className="blog-home-posts-wrapper">
        <RenderPosts posts={posts} />
      </div>
    </section>
  </>
)

export default withPreview(BlogTemplate)
