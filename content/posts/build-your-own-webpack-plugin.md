---
title: Build your own webpack plugin
date: 2021-05-14T06:40:32.169Z
template: "post"
draft: false
slug: "build-your-own-webpack-plugin"
category: "javascript"
tags:
  - "webpack"
  - "javascript"
  - "plugin"
description: "In this blog post I will teach you how you can easily build a webpack plugin ..."
socialImage: "media/webpack.png"
---

# Context

Web development is based on 3 principle languages HTML,CSS and Javascript those three ingredients are the backbone of every website the problems is we moved from a simple website to show up some information on a simple web page (web 1.0: Read-only) to more and more complex use case like an interactive webpage (web 2.0: Read-write) or more intelligent web (web 3.0: read-write + XR)…

More the complexity of the web application is increasing more the tooling involved in the creation and maintaining is heavy … this fact drives us to a reality that the only HTML,CSS, and Javascript are not enough anymore and we should use React,PUG,SCSS,Typescript, NPM packages …

More and more tools and this is another problem from **Developer experience** (browser compatibility and data exportability) and **optimization** (big bundle files) perspective … but hopefully we have bundlers like _Parcel_,_Rollup_,_Snowpack_ and **Webpack**

In today’s blog post we will see what is webpack and how it works and finally, we will end up by creating a simple plugin.

# Webpack

We said that the problem with a complex and modern web application is multiple module dependencies. Webpack as a module bundler has one important job is to take multiples dependencies (for example multiple js files) and combine that into one single file (or multiple chunks files).

To handle those different types of dependencies webpack uses **Loaders**; A Loader is a way to process files that are not javascript (we assumed that webpack is created to handle js files) for example we can configure webpack (via `webpack.config.js` file) to handle SVG,CSS,SCSS …

Some we need more complex/advanced treatment for our assets besides loading them here webpack uses **plugins** to achieve this routine. We can control webpack compilation with plugins by tapping directly to bundler lifecycle for example we can use a plugin to minify our CSS code or maybe apply some auto-prefixing …

Like loaders plugins can be added via `npm` and should be configurated using `webpack.config.js`

# Let’s code

Webpack plugin is just a javascript class with _apply_ method this method take `compiler` instance as a parameter so we can use `compiler.plugin` to register our custom logic based on a particular webpack compiler event so our plugin will be something like:

```js
// ./plugin/super-plugin.js
class SuperPlugin {
  apply(compiler) {
    compiler.hooks.done.tap('Super Plugin', (stats) => {
      console.log('Hello World! from Super Plugin');
    });
}
module.exports = SuperPlugin
```

and we can add it to our `webpack.config.js` file like this:

```js
const SuperPlugin = require("./plugin/super-plugin.js");
// ...
plugins: [new SuperPlugin()];
```

And we can add options to our plugin using the class _Constructor_

```js
// ./plugin/super-plugin.js
class SuperPlugin {
  constructor(options){
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('Super Plugin', (stats) => {
      console.log('Hello World! from Super Plugin');
      console.log('Options:', this.options);
    });
}
module.exports = SuperPlugin
```

you can try plugin by running package.json _dev_ script: `yarn dev`

```json
{
  "scripts": {
    "dev": "webpack"
  },

```

let's code something useful a plugin that give use the size of the output file :

```js
// ./plugin/super-plugin.js

const fs = require("fs");

class SuperPlugin {
  constructor(options){
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('Super Plugin', (stats) => {
         const { path, filename } = stats.compilation.options.output;
         const stats = fs.statSync(`${path}/${filename}`)
         const size = stats.size / (1024*1024);
         console.log(`Your output size is : ${size} MB`)

    });
}
module.exports = SuperPlugin
```

Cheers
