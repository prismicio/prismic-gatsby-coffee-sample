import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'
import linkResolver from '../utils/linkResolver'
import { prismicRepo } from '../../prismic-configuration'

const PreviewPage = ({ isPreview }) => {
  if (isPreview === false) return 'Not a preview!'
  return (
    <div>
      <p>Loading</p>
    </div>
  )
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: prismicRepo,
  linkResolver: () => linkResolver,
})
