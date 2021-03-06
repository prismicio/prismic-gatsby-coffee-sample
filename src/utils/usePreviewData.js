import { useMemo } from 'react'
import { mergePrismicPreviewData } from 'gatsby-source-prismic'

// Returns true if we're in a browser, false otherwise. This will help guard
// against SSR issues when building the site.
const IS_BROWSER = typeof window !== 'undefined'

/**
 * Prismic preview hook
 * @param {object} staticData Data object from Gatsby page
 */
export default function usePreviewData(staticData) {
  return useMemo(() => {
    // If we're not in a browser (i.e. we're in SSR) or preview data has not been
    // set, use the non-preview static data.
    if (!IS_BROWSER || !window.__PRISMIC_PREVIEW_DATA__) return staticData

    return mergePrismicPreviewData({
      staticData,
      previewData: window.__PRISMIC_PREVIEW_DATA__,
    })
  }, [staticData])
}
