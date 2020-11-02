---
title: Design patterns in Typescript made easy — part II
date: 2018-10-28T22:40:32.169Z
template: "post"
draft: false
slug: "design-patterns-in-javascript-made-easy-part-ii"
category: "typescript"
tags:
  - "typescript"
  - "design-patterns"
description: "Today we will talk about structural design patterns which are considered as design patterns that make easy/possible relations between…"
socialImage: "media/1_tAiVuMuN7qx5CSeRBTDiFg.jpeg"
---

Today we will talk about structural design patterns which are considered as design patterns that make easy/possible relations between different classes.

But first I have to talk about an important design pattern that belongs to our last articles’s design patterns category (creational), the Factory design pattern is defined as the solution of creating an object of a class without exposing the creation logic to the client and refer to a newly created object using a common interface.

**The problem:**

Imagine a scenario where there are multiple cases in the client class and we call multiple new keywords for creating new objects.

```ts
if (value == "Ferari") {
  let car = new Ferari();
} else if (value == "Bugati") {
  let car = new Bugati();
}
```

**The solution:**

The Factory method pattern is to define an interface for creating objects but delegates the object creation to the subclasses.

```ts

interface CarFactory
{
    public function makeCar(type:string);
}

interface Car
{
    public function getType();
}

class Ferari inmplements Car
{
     public function getType()
     {
        return 'Ferari';
     }

}

class Bugati inmplements Car
{
     public function getType()
     {
        return 'Bugati';
     }

}


class CarFactory implements CarFactory
{
    public function makeCar()
    {
      if(value == 'Ferari'){
          let car = new Ferari();
      }
     else if(value == 'Bugati'){
        let car = new Bugati();
     }

    }
}

```

```ts
/* Client */

let factory = new CarFactory();

let car = factory.makeCar("Ferari");

console.log(car.getType());
```

## 1.Adapter design pattern

[](media/0_cXCec3AXy8R3cqlz.png)

The adapter is a structural design pattern that allows objects with incompatible interfaces to collaborate just like HDMI <-> DVI adapter

**The problem :**

Imagine that you have an app that works with data in XML format, but at some point, you need to use a library that can only work with JSON.

For example our application use a soap API (XML output)to get weather data for the north of the country from a provider and show it in LCD display the code works just fine but you decide to use another API to get the data of the south of the country and here you have to use a Rest API (JSON output) you have two solutions to deal with the new situation : 1- to make a new class to deal with the rest API OR 2 — to use Adapter design patterns.

**The solution :**

We have adapter here that can communicate with the client this adapter can understand both types of returns (XML and JSON) and provide a data for our LCD display (client)

```ts
interface IDisplayable {
  getData();
  display();
}

class SOAPService implements IDisplayable {
  getData(): void {
    //call api and get xml data
    return xmlData;
  }
  display(data): void {
    console.log(this.convertFromXML(data));
  }

  convertFromXML(): string {
    //convert from XML to displayable format
    return string;
  }
}

class JSONService implements IDisplayable {
  getData(): void {
    //call api and get json data
    return jsonData;
  }

  display(data): void {
    console.log(this.convertFromJSON(data));
  }

  convertFromJSON(): string {
    //convert from JSON to displayable format
    return string;
  }
}

class APIAdapter implements IDisplayable {
  soapService: SOAPService = new SOAPService();
  jsonService: JSONService = new JSONService();
  type: string = "";

  constructor(type: string) {
    this.type = type;
  }

  getData(): void {
    if (type === "soap") {
      return this.soapService.getData();
    } else if (type === "json") {
      return this.jsonService.getData();
    } else {
      throw new Error("Format not handled ");
    }
  }

  display(): void {
    if (type === "soap") {
      this.soapService.display();
    } else if (type === "json") {
      this.jsonService.display();
    } else {
      throw new Error("Format not handled ");
    }
  }
}
```

We have adapter here that can communicate with the client this adapter can understand both types of returns (XML and JSON) and provide a data for our LCD display (client)

## 2.Facade design pattern

[](media/0_MbRd9Br5rRuIMlvt.png)

Facade pattern hides the complexities of the system and provides an interface which the client can access the system. This type of design pattern adds an interface to the existing system to hide its complexities.

**The problem:**

For example, we have a class called by our client to upload the image to Amazon S3 but before upload, we have to check, convert, rename the file. Every action here is related to a specific class we have a class to check the file and another to rename it using a specific naming strategy and checking file using a machine learning predict library to prevent a pornographic content.

As we see here we have a complex system to upload a file we will use a Facade to reduce all this complexity in a single method (one call)

**The solution :**

// call example**import** Uploader = Facade.Upload;  
// checking , renaming , convert and upload the file let file = new File('./pixel.png');  
Uploader.upload(file);

Here the facade method ‘upload’ provides to the client an easy way to reduce all the process with a simple one call to a static method

```ts
class Uploader {
  uploadToS3(file) {
    /* doing some AWS SDK things here */
  }
}

class NameChanger {
  rename(file) {
    /* doing some Naming here */
  }
}

class Converter {
  convert(file) {
    /* doing some Converting here */
  }
}

class Checker {
  predict(file) {
    /* doing some Machine Learning  here    */
  }
}

namespace Facades {
  export class Upload {
    static Upload(file) {
      let nameChanger: NameChanger = new NameChanger();
      let converter: Converter = new Converter();
      let checker: Checker = new Checker();
      let uploader: Uploader = new Uploader();

      let myFile = checker.predict(file);

      myFile = nameChanger.rename(myFile);

      myFile = converter.convert(myFile);

      uploader.uploadToS3(myFile);
    }
  }
}
```

```ts
// call example
import Uploader = Facade.Upload;
// checking , renaming , convert and  upload the file
let file = new File("./pixel.png");
Uploader.upload(file);
```

Here the facade method ‘upload’ provides to the client an easy way to reduce all the process with a simple one call to a static method

## 3.Proxy design pattern

[](media/0_ahKhoqRQSx9OdZ4s.png)

Proxy is a structural design pattern that works as an interface of another class, instead of calling a function from a real class we go through the proxy

**The problem :**

We have a powerful object that logs actions in our database for example but to log in the database you should have a role for that (permissions), there is multiple solutions for this problem but the best way is to use Proxy.

In an ideal world, we would put this code directly into the object’s class, but that is not always possible. For instance, the class may reside in a closed 3rd-party library.

**The solution :**

```ts
interface ILogable {
  log(action): void;
}

class Logger implements ILogable {
  log(action) {
    /* doing some Log action here */
  }
}

class LoggerProxy implements ILogable {
  constructor() {
    this.checkAccess();
  }

  log(action) {
    let logger = new Logger();

    logger.log(action);
  }

  checkAccess() {
    /* check that the user have a correct role to Log in the database */
  }
}
```

```ts
// call example
let logger = new LoggerProxy(); // here we check for permissions// later we loglogger.log('Delete payment resource ID 123');
```

First, we create an interface to make class and proxy interchangeable we invoke the original class function into the proxy function and before instantiation of the proxy we check the permission of the connected user.

Part I : [https://soubai.me/posts/design-patterns-in-javascript-made-easy-part-i](https://soubai.me/posts/design-patterns-in-javascript-made-easy-part-i)
