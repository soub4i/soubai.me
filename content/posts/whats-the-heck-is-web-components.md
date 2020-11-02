---
template: post
title: What's the heck is web components
slug: whats-the-heck-is-web-components
category: javascript
date: 2020-10-29T01:00:00.000Z
socialImage: media/86a7f523-c057-4da1-b17d-0c3da459d965.jpg
description: Hello in this blog post I will try to demystify the web component concept for you
draft: false
tags:
  - javascript
  - web-component
  - react
  - dom
---

In this blog post I will try to demystify the web component concept for you and we'll create a simple web component as a demo

## What is Component (React as an example) ?

Let's take react as an example, react is a great frontend library focused on building UI (user interfaces) quickly and efficiently .

To build UI react (and other javascript frontend frameworks) use the components. And here component stands for the building block part for every UI; for example we have a dashboard page with a navbar, sidebar, chart... every part of UI elements is a component moreover the page is one big component includes all other ones and act as a container.

![](media/react-component-tree.png)

In react to create a component we have two ways :
1. function-based component:  where the component is a function 
2. class-based component: where the component  is a class extending `React.Component`

each one has pros and cons (React team is pushing to use functional components in the newest versions)

So what are web components and why we need them if we already have javascript frameworks?

## Web Component:

Web components are a set of **web platform APIs** that allows you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.

In easy words we don't need javascript framework to create components we can use vanilla javascript to define our custom HTML elements while maintaining the encapsulation and reusability.

### Web components specifications:

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) web components are: 

 > Suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.

those set of techos are the specifications to define valid web components :

 1. **Custom Elements**: The Custom Elements specification lays the foundation for designing and using new types of DOM elements.
 ![](media/unnamed-2-.png)
>Allow you to define custom elements and their behavior
       
 3. **Shadow DOM**: The shadow DOM specification defines how to use encapsulated style and markup in web components.
 ![](media/unnamed-3-.png)
> Allow you to attach an encapsulated "shadow" DOM tree to an element
       
 4.  **ES Modules**: The ES Modules specification defines the inclusion and    reuse of JS documents in a standards-based,
    modular, performant way.
       
![](media/pasted-image-0.png)
> ECMAScript standard for working with modules. While Node.js has been using the CommonJS standard for years, the browser never had a module system
       
 4.  **HTML Template**: The HTML template element specification defines how to declare fragments of markup that go unused on page load, but can be instantiated later on at runtime.
    
 ![](media/unnamed-1-.png)
> The `<template>` and `<slot>` elements enable you to write markup templates that are not displayed in the rendered page. These can then be reused multiple times as the basis of a custom element's structure.

### Browser Compatibility
An important thing that made web components hypes recently is the big adoption/compatibility with the modern browsers so we can use them without polyfills nor a bundlers 

 ![](media/bc.png)

## Demo
I'll create  a web component to load Rick & Morty charcters from rest API

```js
// index.js
class RMCharacter extends HTMLElement {

    // make the custom attribute observable with attributeChangedCallback
    static get observedAttributes() { return ['name']; }

    
    constructor() {
        super()
        // attache the shadow dome to our web component to ensure the style encapsulation
        this.shadowDOM = this.attachShadow({ mode: 'open' });
        this.shadowDOM.innerHTML = `
        <style>
            h3 {
            color : red
        }
        </style>
        `
    }

    // lifecycle method called when the web component is mounted
    async connectedCallback() {

        // call the Rick & Morty api to get the character by name
        let data = await fetch("https://rickandmortyapi.com/api/character/?name=" + this.name)
        let { results } = await data.json()
        // create html elements div, img, h3
        const warpper = document.createElement("div")
        const img = document.createElement("img")
        const name = document.createElement("h3")
        // set values to our html elements
        img.setAttribute("src", results[0].image)
        name.innerText = results[0].name
        warpper.appendChild(name)
        warpper.appendChild(img)
        // add everything to the root shadowDOM
        this.shadowDOM.appendChild(warpper)
    }

    // lifecycle method to catch changes of attributes

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === "name" && oldValue !== newValue) {

            this.name = newValue

        }
    }
}


// define our web component to the browser
window.customElements.define('rm-character', RMCharacter)
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        h3 {
            color: green
        }
    </style>
</head>
<body>
    <h3>My</h3>
    <rm-character name="Rick Sanchez"></rm-character>
    <rm-character name="morty"></rm-character>
    <script type="module" src="index.js"></script>
</body>
</html>
```

And the result is something like this :

![](media/sreenshot-demo.png)

As you can see we create a custom, reusable, encapsulated HTML element easily with web component specifications and this element can be re-used with any kind of frontend technologies (vanilla, jquery, javascript framework..) and within the same project or cross-projects 

## What's next :

Check this resources and tools :

- Polymer (Backed by Google)
- Stencil (Backed by Ionic)
- Skate.js (Works with other frameworks )
- Hybrids (UI lin for create WC)

