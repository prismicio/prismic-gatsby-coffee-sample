import React from 'react'
import { withUnpublishedPreview } from 'gatsby-source-prismic'
import { BlogPostTemplate } from '../templates/blogPost'
import { ProductTemplate } from '../templates/ourProduct'
import { HomeTemplate } from './index'
import { ProductsTemplate } from './products'
import { BlogTemplate } from './blog'

const Page404 = () => (
  <div className="not-found">
    <h1>404</h1>
    <h3>The page you are looking for was not found</h3>
    <p>
      <a href="/">
        <button type="button">Return to homepage</button>
      </a>
    </p>
  </div>
)

export default withUnpublishedPreview(Page404, {
  templateMap: {
    homepage: HomeTemplate,
    product: ProductTemplate,
    products: ProductsTemplate,
    blog_post: BlogPostTemplate,
    blog_home: BlogTemplate,
    prismicHomepage: HomeTemplate,
    prismicProduct: ProductTemplate,
    prismicProducts: ProductsTemplate,
    prismicBlogPost: BlogPostTemplate,
    prismicBlogHome: BlogTemplate,
  },
})
