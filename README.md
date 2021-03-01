##  Example website with Prismic and Gatsby

Example website demo that shows how to use the `gatsby-source-prismic` plugin.

It showcases how a website for a coffee store could be designed and built, as well as the techniques you will have to use to generate pages dynamically when using a Prismic repository as a data source, while also being able to use the **preview** and **release** features.

For more information, refer to the [official Prismic and Gatsby documentation](https://prismic.io/docs/technologies/gatsby).

#
## Demo website

A deployment demo is available in Netlify: https://gatsby-coffee-demo.netlify.com/
#
## 1. Launch the project

### Install the CLI
```
npm install -g prismic-cli
```

### Run the theme command
navigate where you want to create your new project folder and run the following command:
```
prismic theme --theme-url https://github.com/prismicio/prismic-gatsby-coffee-sample --conf prismic-configuration.js
```
This will create a new Prismic content repository, set up the custom types, create a few documents, and install the project code.

## 1. Run the project 
```
gatsby develop
```
Your site should now be running locally at [http://localhost:8000](http://localhost:8000)!
#
### Building

```
gatsby build
```

### Serving built folder
```
gatsby serve
```
