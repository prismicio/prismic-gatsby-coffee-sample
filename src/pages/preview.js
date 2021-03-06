import React, { useEffect } from 'react'
import { navigate, useStaticQuery, graphql } from 'gatsby'
import { usePrismicPreview } from 'gatsby-source-prismic'
import { prismicRepo } from '../../prismic-configuration'

// Note that the `location` prop is taken and provided to the `usePrismicPreview` hook.
const PreviewPage = ({ location }) => {
  // Let's use a static query to retrieve all known paths. We'll use it later
  // to navigate to the unpublishedPreview page if the document is not
  // published.
  const { allSitePage } = useStaticQuery(graphql`
    {
      allSitePage {
        nodes {
          path
        }
      }
    }
  `)
  const allPaths = allSitePage.nodes.map((node) => node.path)

  const { isPreview, previewData, path } = usePrismicPreview({
    // The repositoryName value from your `gatsby-config.js`.
    repositoryName: prismicRepo,
  })

  // This useEffect runs when values from usePrismicPreview update. When
  // preview data is available, this will save the data globally and redirect to
  // the previewed document's page.
  useEffect(() => {
    // If this is not a preview, skip.
    //   null = Not yet determined if previewing.
    //   true = Preview is available.
    //   false = Preview is not available.
    if (isPreview === false || !previewData) return

    // Save the preview data to somewhere globally accessible. This could be
    // something like a global Redux store or React context.
    //
    // We'll just put it on window.
    window.__PRISMIC_PREVIEW_DATA__ = previewData

    // Navigate to the document's page if page exists.
    if (allPaths.includes(path)) {
      navigate(path)
    } else {
      navigate('/unpublishedPreview')
    }
  }, [isPreview, previewData, path])

  // Tell the user if this is not a preview.
  if (isPreview === false) return <div>Not a preview!</div>

  return <div>Loading preview...</div>
}

export default PreviewPage
