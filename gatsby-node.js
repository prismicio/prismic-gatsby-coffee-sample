const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pages = await graphql(`{
    allPrismicProduct {
      nodes {
        uid
        type
        url
      }
    }
    allPrismicBlogPost {
      nodes {
        uid
        type
        url
      }
    }
  }
`)

  pages.data.allPrismicProduct.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/Product.js'),
      context: { ...page },
    })
  })

  pages.data.allPrismicBlogPost.nodes.forEach((page) => {
    createPage({
      path: page.url,
      component: path.resolve(__dirname, 'src/templates/BlogPost.js'),
      context: { ...page },
    })
  })
}
