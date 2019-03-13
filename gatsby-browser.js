const { registerResolvers } = require('@prismicio/gatsby-source-prismic-graphql');
const { linkResolver } = require('./src/utils/linkResolver');
 
registerResolvers(linkResolver);