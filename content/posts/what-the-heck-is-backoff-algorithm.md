---
title: Backoff Algorithm implementation in javascript
date: 2021-03-07T06:40:32.169Z
template: "post"
draft: false
slug: "backoff-algorithm-implementation-in-javascript"
category: "javascript"
tags:
  - "javascript"
  - "algorithm"
description: "The first time I was asked 'Define backoff algorithm' I mumbled WTH is Backoff algorithm..."
socialImage: "media/x4stck1ndz7o1bknv3lh.jpg"
---

# definitions

The first time I was asked "Define backoff algorithm" I mumbled WTH is Backoff algorithm I wasn't able to find anything in the words to gives me a lead to a generic definition so I can keep saving my Ego. I answered I don't know after that I searched and I got a lot of definitions but the clearest to me is: _Binary exponential backoff or truncated binary exponential backoff refers to an algorithm used to space out repeated retransmissions of the same block of data, often to avoid network congestion._

In simple words is an algorithm (sequence of well-defined, computer-implementable instructions) that makes sure to retry a failed action (fetch data from a server) until it succeeds without flooding the system with retries. And this achieved by putting waitings periods between retries to give a target time to recover.

This algorithm is widely used to resolve network problems such as collision, network congestion...

Retrying a failed fetch call to a server is the most easier implementation of this algorithm highly used in Networking such when the mobile network is saturated and your device is trying to connect to the endpoint (station) using this algorithm implementation

# Binary exponential backoff

The backoff algorithm is very good at solving this kind of problem but the challenge is how we can define a good/efficient "wait time" between retries because sending requests too soon can overwhelm our server and puts more loads. So here the standard is to use a Binary exponential backoff is a backoff strategy that waits exponentially longer for subsequent retries; For example, the first retry waits 1s and the subsequent ones double the previous values exponentially 1s, 2s, 4s, 8s, 16s, 32s… and that can allow our program to start with small waiting values and reach a big value quickly.

# Implementation

In this article, I will try to implement this algorithm using javascript to retry a failed fetch request.

there is an important thing to highlight every time you choose backoff strategy: **Make sure to put a limit to the number of retries** so that your program can throw error don't build a "GOD program"

Let's hack

let's say we want to retry our call request until it's successful or reach the value of the max attempts (zero because we going to do that **recursively**)

```js
// let's create a wait function that takes a duration

const wait = (duration) => new Promise((res) => setTimeout(res, duration));

// retry is a function that takes  maxAttempts (number of allow retries) , a callback (function to repeat) and a delay (time in ms)

const retry = (maxAttempts, cb, delay = 500) =>
  fn().catch((err) =>
    maxAttempts > 1
      ? pause(delay).then(() => backoff(maxAttempts - 1, fn, delay * 2)) // *2 is the exponential rate
      : Promise.reject(err)
  );
```

And to finally

```js
// a fetch api from a very busy server

const call = fetch("https://bac2021.men.gov.ma/undifined-endpoint");

// RUN retry with call and  10 max retries and 500ms as starting wait time &&  implicitly pass the result of the promise to to the console.log

retry(10, call).then(console.log()).catch(console.log());
```

# Conclusion

Using the retry strategy is a very good choice in the sensitive systems and gives a better user experience to your applications however make sure you define a full stop point to your programs. Cheers!
