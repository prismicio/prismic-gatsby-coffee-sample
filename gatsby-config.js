const { prismicRepo, releaseID, accessToken } = require('./prismic-configuration')
const linkResolver = require('./src/utils/linkResolver')

const repoName = process.env.PRISMIC_REPO_NAME || prismicRepo
const apiKey = process.env.PRISMIC_API_KEY || accessToken
const prismicReleaseID = process.env.PRISMIC_RELEASE_ID || releaseID

const authorSchema = require('./custom_types/author.json')
const blogHomeSchema = require('./custom_types/blog_home.json')
const blogPostSchema = require('./custom_types/blog_post.json')
const homepageSchema = require('./custom_types/homepage.json')
const landingPageSchema = require('./custom_types/landing_page.json')
const layoutSchema = require('./custom_types/layout.json')
const productSchema = require('./custom_types/product.json')
const productsSchema = require('./custom_types/products.json')

const gastbySourcePrismicConfig = {
  resolve: 'gatsby-source-prismic',
  options: {
    repositoryName: repoName,
    accessToken: apiKey,
    releaseID: prismicReleaseID,
    prismicToolbar: true,
    linkResolver: () => linkResolver,
    schemas: {
      author: authorSchema,
      blog_home: blogHomeSchema,
      blog_post: blogPostSchema,
      homepage: homepageSchema,
      landing_page: landingPageSchema,
      layout: layoutSchema,
      product: productSchema,
      products: productsSchema,
    },
  },
}

module.exports = {
  siteMetadata: {
    title: 'Coffee Shop Demo',
    description: 'Gatsby + Prismic!',
  },
  flags: {
    DEV_SSR: false,
  },
  plugins: [
    gastbySourcePrismicConfig,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/coffee.png', // This path is relative to the root of the site.
      },
    },
  ],
}
