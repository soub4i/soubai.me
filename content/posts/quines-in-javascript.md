---
title: Holy moly! Quines in javascript
date: 2021-03-14T06:40:32.169Z
template: "post"
draft: false
slug: "quines-in-javascript"
category: "javascript"
tags:
  - "quine"
  - "javascript"
  - "geek"
description: "Let's build a quine using javascript. but wait a minute what is QUINE ??? ..."
socialImage: "media/langs.png"
---

# Definition

Let's build a quine using javascript. but wait a minute what is QUINE ???

A Quine the name came from the book Gödel, Escher, Bach in honor of philosopher Willard Van Orman Quine (1908–2000) by Douglas Hofstadter and it significate a computer program that takes no input and can print its own source code. These programs called "self-replicating programs" or "self-reproducing programs".

The behavior of this program it's can be used to reproduce new programs in a given ecosystem think about a Worm (computer virus) that can reproduce itself through network devices.

> Imagine combining quining with AI :-o

# Rules

Mainly quines problems (as I know) are used as challenge or fun in computer science and if you want to make a quine in any programming language you need to fit 3 rules:

- Quine can't get any input or `args`

- You most achieve quining without using IO (read from the disk) so something like this isn't allowed

```js
console.log(require('fs').readFileSync('./index.js',{encoding:'utf8', flag:'r'}))
```

- You quine need to have at least 1 character because technically an empty program is a quine that print it's own source code _YEY CRAZY_

# Advanced Quines 
What we described here is a "vanilla" Quine but we have more advanced ones, grab a set:

### PolyQuine:

![](media/1_EVLTR5kscFOBdAxdEQ5nyA.png)

is a program that it's valid in more than one programing language at the same time and in each one, it's printing its source code.


### Ouroboros quine

![](media/langs.png)

It's `ruby` program that's =(create)=> `rust` program that's =(create)=> `scala` program ... and after 128 languages it's create a the **original** `ruby` program. This beautiful beast is created by japanase programmer Yusuke Endoh (ruby core language contributor); Check this [repo](https://github.com/mame/quine-relay) for more information.

# Hacking time
As I use javascript I'll try to build one using javascript basically I need to use a template literals and stringify the main function and put it as variable in the string template and what's makes my task relatively easy is all javascript functions have a `.toString()` method that is fired automatically when you try to treat a function as a string (print, concat ...); plus for a simplicity reason I will use a IIFE.

```js
(function q(){
  return '('+ q.toString() +')()'
})()
```

![](media/quine.png)

and for the sake of geekiness 

```js
$=_=> `$=${$};$()`;$()
```

![](media/quine_geeky.png)



