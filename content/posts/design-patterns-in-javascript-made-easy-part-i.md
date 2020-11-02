---
title: Design patterns in Typescript made easy — part I
date: 2018-10-08T22:40:32.169Z
template: "post"
draft: false
slug: "design-patterns-in-javascript-made-easy-part-i"
category: "typescript"
tags:
  - "typescript"
  - "design-patterns"
description: "A pattern is a reusable solution that can be applied to commonly occurring problems in software design"
socialImage: "media/1_tAiVuMuN7qx5CSeRBTDiFg.jpeg"
---

> If you’re a Here probably you heard about Design patterns Or You are Javascript enthusiast in both cases Welcome. Today I will write about…

A pattern is a reusable solution that can be applied to commonly occurring problems in software design — in our case — in writing Javascript web applications. Another way of looking at patterns are as templates for how we solve problems — ones which can be used in quite a few different situations. _(Book: Learning JavaScript Design Patterns by Adnan Osmani)_

Before we start I have to configure the Javascript project to use Typescript to benefit from the power of Oriented Object Programming such interfaces and types :

First thing to do is to grab my boilerplate from github :

```
$ git clone https://github.com/AbderrahimSoubaiElidrissi/nodejs-typescript-boilerplate.git
$ cd nodejs-typescript-boilerplate\
$ npm install


```

now we have our work space ready we can start with the first design pattern

## 1.Constructor Pattern :

> In classical object-oriented programming languages, a constructor is a special method used to initialize a newly created object once memory has been allocated for it. In JavaScript, as almost everything is an object, we’re most often interested in _object_ constructors.

**Problem :**

Our application uses an object to structure the data and call service’s methods so we need to initialize those objects and populate there properties.

**Solution :**

The Constructor is a “Magic” method used to initialize the the properties of an object and for invoking methods on the object initialization.

**Example :**

got to the src/app.ts edit file with this snippet :

```ts
class Greeter {
  greeting: string;

  constructor(message: string) {
    this.greeting = message;
    console.log(`Hello ${this.greeting} !`);
  }
}

let greeter = new Greeter("world"); // Hello world !
```

We can see in the console “Hello world” after ‘npm start’ which means our constructor has set the value passed in the parameters to the property greeting

## 2.Singleton Pattern :

![](media/1_FFhIuK-Y9k1FrBXLWKtYyg.png)

The next pattern is one of the most famous patterns because it’s a member of squad Gangs of Four Design patterns .

**Problem :**

Our application needs only one single instance of a given class with a global public access (example Session instance).

**Solution :**

Singleton pattern is a solution to restrict the instantiation of a class and ensures that only one instance of the class exists. Singleton most provide a global access point to get the instance of the class generally we use the singleton patterns to achieves functions like Logging ,Caching,Session…

**Example** :

```ts
class Singleton {
  private static instance: Singleton = new Singleton();

  constructor() {
    if (Singleton.instance) {
      throw new Error(
        "Error: Use SingletonClass.getInstance() instead of new."
      );
    }
    Singleton.instance = this;
  }

  public static getInstance(): Singleton {
    return Singleton.instance;
  }
}
```

The following code will throw the error because we have early an instance of Singleton class stored in the property instance. Another interesting Idea to enforce the Singleton patterns without testing instance in the constructor is to make the constructor of the singleton class private this will prevent people from instantiate your class

```ts
let mySuperInstance = new Singleton(); // Error
```

To instantiate the singleton you have to call the static method getInstance()

```ts
let mySuperInstance = Singleton.getInstance(); // success
```

## 3.Prototype pattern :

![](media/1_zZ5_U5KmjuSw5wsbp9GMGw.png)

Our next design pattern is the Prototype design patterns. Prototype is used when the type of objects to create is determined by a prototype generally to improve the performance of the architecture by reducing the cost of creating Objects.

**Problem :**

Our applications need objects to achieve function but the creation of the object (using operator new) is costly in the point of view performances for example a creation of an instance of an object involves calling the database or making an API calls .

**Solution :**

Prototype patterns is required when object creation is time consuming, and costly operation, so we create an object with the existing object itself. One of the best available way to create an object from existing objects are **clone() method**. Clone is the simplest approach to implement the prototype pattern. However, it is your call to decide how to copy existing object based on your business model.

**Example :**

```ts
class Singleton {
  private static instance: Singleton = new Singleton();

  constructor() {
    if (Singleton.instance) {
      throw new Error(
        "Error: Use SingletonClass.getInstance() instead of new."
      );
    }
    Singleton.instance = this;
  }

  public static getInstance(): Singleton {
    return Singleton.instance;
  }
}
```

I create the interface ICloneable to enforce the prototype class to implement the method clone(). The clone method return an exact clone of the instance of prototype class in result we have two instances of a class with only one use of the “new” operator and this practice reduces the cost of creating a heavy object (Loops, database calls …)

To test the design pattern :

```ts
//the instance
let prototype = new Prototype(1);//the clone
let pClone = prototype.clone();console.log(prototype.list\[10\] === pClone.list\[10\] ); //true
console.log(prototype.identity === pClone.identity); //true

```
