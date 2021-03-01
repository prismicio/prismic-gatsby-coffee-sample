import React from 'react'
import { RichText } from 'prismic-reactjs'

const renderItems = (slice) => slice.items.map((item, index) => (
  <div key={index} className="numeroted-items-item-wrapper">
    <RichText render={item.description_paragraph.raw || []} />
  </div>
))

export default ({ slice }) => (
  <section>
    <div className="l-wrapper">
      <header className="numeroted-items-header">
        <div className="numeroted-items-header-title">
          <RichText render={slice.primary.title_section.raw || []} />
        </div>
      </header>
    </div>
    <div className="numeroted-items-items-wrapper">{renderItems(slice)}</div>
  </section>
)
