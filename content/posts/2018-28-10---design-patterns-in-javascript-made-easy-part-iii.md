---
title: Design patterns in Typescript made easy — part III
date: 2019-02-18T22:40:32.169Z
template: "post"
draft: false
slug: "design-patterns-in-javascript-made-easy-part-iii"
category: "typescript"
tags:
  - "typescript"
  - "design-patterns"
description: "in my last two articles, I talked about design patterns (Creational and Structural) in javascript using typescript..."
socialImage: "media/1_tAiVuMuN7qx5CSeRBTDiFg.jpeg"
---

in my last two articles, I talked about design patterns (Creational and Structural) in javascript using typescript. by definition design patterns are the most common solutions for problems in software design.

Today I will finish up this serie of articles with **Behavioral Design Patterns**. According to Wikipedia behavioral design patterns are design patterns that identify common communication patterns among objects and realize these patterns. We will go through three design patterns in this article :

## 1.Observer

Observer pattern is used when there is “one to many relationship” between objects such as if one object is modified, it’s dependent objects are to be notified automatically.

**Problem** :

Imagine that we have a weather system with a central dashboard and multiple sensors. Every time the sensor gets a new value it should appear on the dashboard. The technical solution, if I don’t use a design pattern, the dashboard will be -every time- (Loops every 5 sec for example) checking for the new value from the sensor, this solution is limited and it’s very costly especially when we have a lot of sensors to check every time.

**Example** (Using design pattern) :

```ts
class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}
class Observer {
  constructor() {
    this.observers = [];
  }

  subscribe(fn) {
    this.observers.push(fn);
  }

  unsubscribe(fn) {
    this.observers = this.observers.filter(subscriber => subscriber !== fn);
  }

  broadcast(data) {
    this.observers.forEach(subscriber => subscriber(data));
  }
}

// example
const stationObserver = new Observer();

stationObserver.subscribe(value => {
  console.log(value);
});

let i = 0;
setInterval(() => stationObserver.broadcast(i++), 1000);

const stationObserver = new Observer();

stationObserver.subscribe(value => {
  console.log(value);
});

let i = 0;
setInterval(() => blogObserver.broadcast(i++), 1000);
```

Our next design pattern this night is :

## 2.Interpreter

The interpreter pattern is used to define a grammatical representation for a language and provide an interpreter to deal with this grammar. This pattern involves implementing an expression interface which tells to interpret a particular context.

**Problem** :

Imagine you have a system that helps people with Amyotrophic lateral sclerosis (Like Steven Hawken) to communicate with the world, your program /device can get the data from the “brain” of the patient and convert it to English. One day you want to extend your system to cover more languages: Arabic, French if you don’t use a design pattern you will find yourself repeating your code for every language you want to add.

**Example** (Using design pattern) :

```ts
interface IInterpretable {
  interpret(): string;
}

class GreetingEnglishService implements IInterpretable {
  interpret() {
    return "Hi";
  }
}

class GreetingFrenchService implements IInterpretable {
  interpret() {
    return "Salut";
  }
}

//Example

let greeter = null;
let userLangague = "Fr";

if (userLangague === "Fr") {
  greeter = new GreetingFrenchService();
} else {
  greeter = new GreetingEnglishService();
}

console.log(greeter.interpret());
```

Finally, ladies and gentlemen :

3.**Memento :**

The memento design pattern is used to restore the state of an object to a previous state. Generally, it used when we need to restore an object back to its previous state (e.g. “undo” or “rollback” operations).In the Memento pattern, a memento object will hold the state of another object.

**Problem** :

We are creating our super program that can handle the git commit history everything works correctly but we need to make some “time travel” (state manipulation ).

**Example** (Using design pattern):

The implementation here is with three objects: the _originator_, a _caretaker,_ and a _memento_. The originator is an object that has an internal state. The caretaker is going to do something to the originator but wants to be able to undo the change. The caretaker first asks the originator for a memento object. Then it does whatever operation (or sequence of operations) it was going to do. To roll back to the state before the operations, it returns the memento object to the originator. (Wikipedia)

```ts
class Memento {
  private state: Object;

  public constructor(state: Object) {
    this.state = state;
  }

  public getState(): Object {
    return this.state;
  }
}

class Originator {
  private state: Object;

  public setState(state: Object) {
    console.log("Originator: Setting state to ", this.state);

    this.state = state;
  }

  public commit(): Memento {
    console.log("Originator: Saving to Memento.");

    return new Memento(this.state);
  }
  public roolback(m: Memento) {
    this.state = m.getState();

    console.log("Originator: State after restoring from Memento: ", this.state);
  }
}

class Caretaker {
  private mementos = [];

  public addMemento(m: Memento) {
    this.mementos.push(m);
  }

  public getMemento(index): Memento {
    return this.mementos[index];
  }
}

// Example

let caretaker: Caretaker = new Caretaker();
let originator: Originator = new Originator();
originator.setState({ id: Math.random(), message: "initial commit" });
originator.setState({ id: Math.random(), message: "Tiny fix" });
caretaker.addMemento(originator.commit());
originator.setState({ id: Math.random(), message: "Add cors" });
caretaker.addMemento(originator.commit());

originator.setState({ id: Math.random(), message: "Hopla" });

originator.roolback(caretaker.getMemento(0));
```
