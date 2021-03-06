import React from 'react'
import { BlogPostTemplate } from '../templates/blogPost'

export const UnpublishedPage = (props) => {
  // const previewData = window.__PRISMIC_PREVIEW_DATA__
  return <BlogPostTemplate {...props} />
}

export default UnpublishedPage
