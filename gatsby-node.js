const path = require('path')
const { createPages } = require('@prismicio/gatsby-source-prismic-graphql')

exports.createPages = createPages(async ({ graphql, actions }) => {
  const { createPrismicPage } = actions

  const homepage = await graphql(`
    {
      prismic{
        allHomepages(uid:null){
          edges{
            node{
              _meta{
                uid
                id
                type
              }
              title
              banner_image
              banner_text
              body {
                __typename
                ... on PRISMIC_HomepageBodyFeatured_items {
                  type
                  primary {
                    section_title
                    button_label
                    button_link{
                      __typename
                      ... on PRISMIC_Products {
                        title
                        _meta {
                          uid
                          id
                          lang
                          type
                          tags
                        }
                      }
                    }
                  }
                  fields {
                    link_to_product {
                      __typename
                      _linkType
                      ... on PRISMIC_Product {
                        product_name
                        product_image
                        sub_title
                        _meta{
                          uid
                          id
                          lang
                          type
                          tags
                        }
                      }
                    }
                  }
                }
                ... on PRISMIC_HomepageBodyCta_banner {
                  type
                  primary {
                    image_banner
                    banner_title
                    banner_text
                    cta_label
                    cta_link {
                      __typename
                      ... on PRISMIC__ExternalLink {
                        url
                      }
                    }
                  }
                }
                ... on PRISMIC_HomepageBodyBig_bullet_item {
                  type
                  primary {
                    title_section
                  }
                  fields {
                    description_paragraph
                  }
                }
                ... on PRISMIC_HomepageBodySeparator {
                  type
                }
                ... on PRISMIC_HomepageBodyText_block {
                  type
                  primary {
                    title1
                    paragraph
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  if (homepage.errors) {
    Promise.reject(homepage.errors)
  }
  
  homepage.data.prismic.allHomepages.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/`,
      component: path.resolve(`./src/templates/homepage.js`),
      context: {
        data: node
      },
    })
  })

  const products = await graphql(`
  {
    prismic{
      allProducts{
        edges{
          node{
            _meta{
              type
              id
              uid
            }
            product_name
            product_image
            sub_title
            rich_content
            button_link{
              __typename
              ... on PRISMIC__ExternalLink{
                url
              }
            }
            button_label
            title
            product_description
            related_products_title
            related_products{
              product1{
                __typename
                ... on PRISMIC_Product{
                  product_image
                  product_name
                  sub_title
                  _meta{
                    uid
                    id
                    type
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `)
  if(products.errors) {
    Promise.reject(products.errors)
  }

  products.data.prismic.allProducts.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/products/:uid`,
      params: {
        uid: node._meta.uid
      },
      component: path.resolve(`./src/templates/product.js`),
      context: {
        data: node
      }
    })
  })

  const productHome = await graphql(`
  {
    prismic{
      allProductss(uid:null){
        edges{
          node{
            title
            meta_title
            meta_description
            _meta{
              uid
              id
              type
            }
          }
        }
      }
      allProducts{
        edges{
          node{
            _meta{
              type
              id
              uid
            }
            product_name
            product_image
            sub_title
          }
        }
      }
    }
  }
  `)
  if(productHome.errors) {
    Promise.reject(productHome.errors)
  }

  productHome.data.prismic.allProductss.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/products/`,
      component: path.resolve(`./src/templates/productsHome.js`),
      context: {
        data: node,
        extra: productHome.data.prismic.allProducts.edges
      }
    })
  })

  const blogPosts = await graphql(`
    {
      prismic{
        allBlog_posts{
          edges{
            node{
              _meta{
                uid
                id
              }
              author{
                _linkType
                ... on PRISMIC_Author{
                  name
                  bio
                  picture
                }
              }
              image
              title
              rich_content
            }
          }
        }
      }
    }
  `)
  if(blogPosts.error) {
    Promise.reject(blogPosts.error)
  }

  blogPosts.data.prismic.allBlog_posts.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/blog/:uid`,
      params: {
        uid: node._meta.uid
      },
      component: path.resolve(`./src/templates/blogPost.js`),
      context: {
        data: node
      }
    })
  })

  const blogHome = await graphql(`
    {
      prismic{
        allBlog_homes(uid:null){
          edges{
            node{
              _meta{
                uid
                id
                type
              }
            }
          }
        }
        allBlog_posts{
          edges{
            node{
              _meta{
                uid
                id
                type
              }
              title
              image
              rich_content        
            }
          }
        }
      }
    }
  `)
  if (blogHome.errors) {
    Promise.reject(blogHome.errors)
  }

  blogHome.data.prismic.allBlog_homes.edges.forEach(({ node }) => {
    createPrismicPage({
      pattern: `/blog/`,
      component: path.resolve(`./src/templates/blogHome.js`),
      context: {
        data: node,
        extra: blogHome.data.prismic.allBlog_posts.edges
      }
    })
  })

})