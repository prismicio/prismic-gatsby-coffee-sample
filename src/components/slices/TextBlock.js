import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../../utils/linkResolver'

export default ({ slice }) =>
  <section>
    <div className="l-wrapper">
      <div className="text-block-inner">
        <div className="text-block-title">
          {RichText.render(slice.primary.title1, linkResolver)}
        </div>
        <div className="text-block-richtext">
          {RichText.render(slice.primary.paragraph, linkResolver)}
        </div>
      </div>
    </div>
  </section>
