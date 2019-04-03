module.exports = {
  siteMetadata: {
    title: `Coffee Shop Demo`,
    description: `Gatsby + Prismic!`,
    author: `@raulg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-prismic-graphql`,
      options: {
        repositoryName: `prismic-gatsby-coffee`,
        path: '/preview',
        previews: true,
        pages: [{
          type: 'Product',
          match: '/products/:uid',
          path: '/products',
          component: require.resolve('./src/templates/product.js')
        },{
          type: 'Blog_post',
          match: '/blog/:uid',
          path: '/blog/',
          component: require.resolve('./src/templates/blogPost.js')
        }]
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
