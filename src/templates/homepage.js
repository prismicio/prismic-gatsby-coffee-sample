import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/linkResolver'
import { CTABanner, FeaturedItems, NumberedItems, Separator, TextBlock } from '../components/slices'
import { withPreview } from '@prismicio/gatsby-source-prismic-graphql'

import '../stylesheets/main.scss'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doc: this.props.pageContext.data
    }
  }

  renderSlices(slices){
    return slices.map((slice, index) => {
      const res = (() => {
        switch(slice.type) {
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

          default: return
        }
      })();
      return res;
    })
  }

  renderBody() {
    return (
      <React.Fragment>
        <header className="homepage-header">
          <div className="l-wrapper">
            <div className="homepage-header-title">
              {RichText.render(this.state.doc.title, linkResolver)}
            </div>
          </div>
        </header>

        <section className="homepage-banner">
          <img className="homepage-banner-image" src={this.state.doc.banner_image.url} alt={this.state.doc.banner_image.alt} />
          <div className="homepage-banner-box-wrapper">
            <div className="homepage-banner-box">
            {RichText.render(this.state.doc.banner_text, linkResolver)}
            </div>
          </div>
        </section>

        <div className="homepage-slices-wrapper">
          {this.renderSlices(this.state.doc.body)}
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderBody()}
      </React.Fragment>
    );
  }
}

export default withPreview(HomePage)