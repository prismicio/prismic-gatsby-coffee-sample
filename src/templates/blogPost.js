import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/layouts'

export const query = graphql`
query BlogPostQuery($uid: String) {
  prismic{
    allBlog_posts(uid: $uid){
      edges{
        node{
          _meta{
            uid
            id
          }
          author{
            _linkType
            ... on PRISMIC_Author{
              name
              bio
              picture
            }
          }
          image
          title
          rich_content
        }
      }
    }
  }
}
`

const RenderBody = ({ blogPost }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <article className="blog-post-article">
      <div className="blog-post-inner">
        <div className="blog-post-image-wrapper">
          <img className="blog-post-image" src={blogPost.image.url} alt={blogPost.image.alt}/>
        </div>
        <div className="blog-post-title">
          {RichText.render(blogPost.title, linkResolver)}
        </div>
        <div className="blog-post-rich-content">
          {RichText.render(blogPost.rich_content, linkResolver)}
        </div>
        <div className="blog-post-author-wrapper">
          {blogPost.author && blogPost.author.picture
            ? <img className="blog-post-author-picture" src={blogPost.author.picture.url} alt={blogPost.author.picture.alt} />
            : ''
          }
          <div>
            {blogPost.author && blogPost.author.name
              ? <p className="blog-post-author-name">{RichText.asText(blogPost.author.name)}</p>
              : ''
            }
            {blogPost.author && blogPost.author.bio
              ? <p className="blog-post-author-bio">{RichText.asText(blogPost.author.bio)}</p>
              : ''
            }
          </div>
        </div>
      </div>
    </article>

    <div data-wio-id={blogPost._meta.id}></div>
  </React.Fragment>
)

const BlogPost = props => {
  const doc = props.data.prismic.allBlog_posts.edges.slice(0,1).pop();
  if(!doc) return null;

  return(
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{RichText.asText(doc.node.title)}</title>
      </Helmet>
      <RenderBody blogPost={doc.node} />
    </Layout>
  )
}

export default BlogPost;