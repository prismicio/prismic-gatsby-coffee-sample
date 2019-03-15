import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { withPreview } from '@prismicio/gatsby-source-prismic-graphql'
import { Helmet } from 'react-helmet'

import Layout from '../components/layouts'

class BlogPost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      doc: this.props.pageContext.data
    }
  }

  renderBody(){
    return (
      <React.Fragment>
        <div className="l-wrapper">
          <hr className="separator-hr" />
        </div>

        <article className="blog-post-article">
          <div className="blog-post-inner">
            <div className="blog-post-image-wrapper">
              <img className="blog-post-image" src={this.state.doc.image.url} alt={this.state.doc.image.alt}/>
            </div>
            <div className="blog-post-title">
              {RichText.render(this.state.doc.title, linkResolver)}
            </div>
            <div className="blog-post-rich-content">
              {RichText.render(this.state.doc.rich_content, linkResolver)}
            </div>
            <div className="blog-post-author-wrapper">
              {this.state.doc.author && this.state.doc.author.picture
                ? <img className="blog-post-author-picture" src={this.state.doc.author.picture.url} alt={this.state.doc.author.picture.alt} />
                : ''
              }
              <div>
                {this.state.doc.author && this.state.doc.author.name
                  ? <p className="blog-post-author-name">{RichText.asText(this.state.doc.author.name)}</p>
                  : ''
                }
                {this.state.doc.author && this.state.doc.author.bio
                  ? <p className="blog-post-author-bio">{RichText.asText(this.state.doc.author.bio)}</p>
                  : ''
                }
              </div>
            </div>
          </div>
        </article>

        <div data-wio-id={this.state.doc._meta.id}></div>
      </React.Fragment>
    )
  }

  render() {
    return(
      <Layout>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{RichText.asText(this.state.doc.title)}</title>
        </Helmet>
        {this.renderBody()}
      </Layout>
    );
  }
}

export default withPreview(BlogPost)