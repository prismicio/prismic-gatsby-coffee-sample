import React from 'react'
import { RichText } from 'prismic-reactjs'

export default ({ slice }) => (
  <section>
    <div className="cta-banner-inner">
      <img
        className="cta-banner-image"
        src={slice.primary.image_banner.url}
        alt={slice.primary.image_banner.alt}
      />
      <div className="cta-banner-content">
        <div className="cta-banner-box">
          <div className="cta-banner-title">
            <RichText render={slice.primary.banner_title.raw || []} />
          </div>
          <div className="cta-banner-text">
            <RichText render={slice.primary.banner_text.raw || []} />
          </div>
        </div>
        <div className="cta-banner-link-wrapper">
          <a className="cta-banner-link" href={slice.primary.cta_link.url}>
            {slice.primary.cta_label}
          </a>
        </div>
      </div>
    </div>
  </section>
)
