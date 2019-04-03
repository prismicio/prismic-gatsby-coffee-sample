import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'

import Layout from '../components/layouts'

export const query = graphql`
{
  prismic{
    allBlog_homes(uid:null){
      edges{
        node{
          meta_title
          _meta{
            uid
            id
            type
          }
        }
      }
    }
    allBlog_posts{
      edges{
        node{
          _meta{
            uid
            id
            type
          }
          title
          image
          rich_content        
        }
      }
    }
  }
}
`

const RenderPosts = ({ posts }) => {
  return posts.map((item) =>
    <div key={item.node._meta.uid} className="blog-home-post-wrapper">
      <article>
        <img className="blog-home-post-image" src={item.node.image.url} alt={item.node.image.alt} />
        <p className="blog-home-post-title">
          {RichText.asText(item.node.title)}
        </p>
        <p className="blog-home-post-excerpt">
          {RichText.asText(item.node.rich_content).substring(0, 158)} …
        </p>
        <div className="blog-home-post-button-wrapper">
          <Link className="a-button" to={linkResolver(item.node._meta)}>
            Read post
          </Link>
        </div>
      </article>
    </div>
  )
}

const RenderBody = ({ blogHome, posts }) => (
  <React.Fragment>
    <div className="l-wrapper">
      <hr className="separator-hr" />
    </div>

    <section className="blog-home-section">
      <div className="blog-home-posts-wrapper">
        <RenderPosts posts={posts} />
      </div>
    </section>

    <div data-wio-id={blogHome._meta.id}></div>
  </React.Fragment>
)

export default ({ data }) => {
  const doc = data.prismic.allBlog_homes.edges.slice(0,1).pop();
  if(!doc) return null;

  return(
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{RichText.asText(doc.node.meta_title)}</title>
      </Helmet>
      <RenderBody blogHome={doc.node} posts={data.prismic.allBlog_posts.edges} />
    </Layout>
  );
}