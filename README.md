
<div align="center">
  <a href="https://www.gatsbyjs.org">
    <img alt="Gatsby" src="https://www.gatsbyjs.org/monogram.svg" width="60" />
  </a>
  <h3><strong>+</strong></h3>
  <a href="https://prismic.io">
    <img alt="Prismic" src="https://prismic.io/...5295089/images/logo-dark.svg">
  </a>
</div>
<h1 align="center">
  Integrating Prismic data sources in Gatsby
</h1>

Example website demo that shows how to use the new Gatsby plugin for Prismic. You will require to have GraphQL enabled in your repository if you wish to use it. Currently, all new repositories have GraphQL enabled by default, feel free to try this out.

It showcases how a website for a coffee store could be designed and built, as well as the techniques you will have to use to generate pages dynamically when using a Prismic repository as a data source, while also being able to use the **preview** and **release** features.

Based on the gatsby default starter and uses the [gatsby-source-prismic-graphql](https://github.com/birkir/gatsby-source-prismic-graphql) plugin for creating pages that can be drafted and previewed. Refer to its documentation for more details on how to use it.

A deployment demo is available in Netlify: https://gatsby-coffee-demo.netlify.com/

### Quickstart
You can bootstrap this demo project by installing it with the `prismic-cli` tool. It will create the repository, along with copying the demonstrative sample content. 
```
$ npm install -g prismic-cli
$ prismic theme https://github.com/prismicio/prismic-gatsby-coffee-sample
```

### Running locally 
```
gatsby develop
```

### Building

```
gatsby build
```

### Serving built folder
```
gatsby serve
```
