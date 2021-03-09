import * as React from 'react'
import { withPreviewResolver } from 'gatsby-source-prismic'

import { linkResolver } from '../utils/linkResolver'

const PreviewPage = ({ isPreview, isLoading }) => {
  if (isPreview === false) return 'Not a preview!'

  return (
    <div>
      <p>Loading</p>
    </div>
  )
}

export default withPreviewResolver(PreviewPage, {
  repositoryName: 'prismic-gatsby-coffee-p',
  linkResolver,
})