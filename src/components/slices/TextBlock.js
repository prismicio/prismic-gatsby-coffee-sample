import React from 'react'
import { RichText } from 'prismic-reactjs'

export default ({ slice }) => (
  <section>
    <div className="l-wrapper">
      <div className="text-block-inner">
        <div className="text-block-title">
          <RichText render={slice.primary.title1.raw || []} />
        </div>
        <div className="text-block-richtext">
          <RichText render={slice.primary.paragraph.raw || []} />
        </div>
      </div>
    </div>
  </section>
)
