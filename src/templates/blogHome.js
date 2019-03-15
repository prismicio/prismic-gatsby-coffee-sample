import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { withPreview } from '@prismicio/gatsby-source-prismic-graphql'
import { Link } from 'gatsby'
import Layout from '../components/layouts'
import { Helmet } from 'react-helmet'

class BlogHome extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: this.props.pageContext.data,
      posts: this.props.pageContext.extra
    }
  }

  renderPosts() {
    return this.state.posts.map((item) =>
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

  renderBody() {
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <section className="blog-home-section">
          <div className="blog-home-posts-wrapper">
            {this.renderPosts()}
          </div>
        </section>

        <div data-wio-id={this.state.doc._meta.id}></div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{RichText.asText(this.state.doc.meta_title)}</title>
        </Helmet>
        {this.renderBody()}
      </Layout>
    );
  }
}

export default withPreview(BlogHome)