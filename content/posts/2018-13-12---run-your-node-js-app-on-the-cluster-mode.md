---
title: Run your node.js app on the cluster mode
date: 2018-12-13T22:40:32.169Z
template: "post"
draft: false
slug: "run-your-node-js-app-on-the-cluster-mode"
category: "node.js"
tags:
  - "node.js"
  - "cluster"
description: "Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser..."
socialImage: "media/node-cluster.png"
---

Javascript is the future for a lot of reasons:

1.  One single language for the frontend and backend
2.  Simple learning curve
3.  Great community (packages managers / frameworks / testing tools)

In light of this great development, other technologies related to javascript are born one of them is the node.js according to Wikipedia :

> Node.js is an open-source, cross-platform JavaScript run-time environment that executes JavaScript code outside of a browser.

In simple words, node.js is the technology which allows us to run javascript in server side to make a backend applications such API, Workers …

You can download it from the official website for any OS :

[https://nodejs.org/en/download](https://nodejs.org/en/download/)

let’s have our demo app :

Create _index.js_

```js
console.log("Hello Medium");
```

Save the file and run it using this command :

```sh
node index.js
```

![](media/1_eUuXPB_SYI0qRDRsiyczBw.png)

Here we launched our app as a single process and after execution, it shut down but in real cases (API server for example) we need to maintain our application executed So we use tools called process managers such _forever_, _strongloop_, _PM2_ to easily run, maintain, log…;

Today, I will use [PM2](http://pm2.keymetrics.io/) :

Let’s install it first :

```
npm install pm2 -g
```

Starting our application with a watch flag :

```
pm2 start index.js --watch
```

![](media/1_zak8W2ZYSuf-wQjfp15aOw.png)

After that we preview the log file :

```
pm2 logs
```

![](media/1_Xjo9MJ2AWUiEYIdzsTKTYQ.png)

Wow! Cool our application is re-launched every time (watched by PM2).

Returning to figure 2 we see all the processes launched by PM2 (single instance <=> single CPU).

Imagine our application is the next _“1B dollar startup”_ API, this kind of applications should have a scalable behavior for fault tolerance and high availability.

To achieve this type of architectures we have a lot of choices: **Serverless** architecture, **Microservices** architecture, **Could based solutions** (AWS Load Balancer )..; In my example, I will use PM2 again to solve the problem,

I will run the applications in all available CPUs using PM2 **cluster mode :**

> cluster mode **:** allows networked Node.js applications to be scaled across all CPUs available, **without any code modifications**.

Let’s define JSON file :

_app.json_

```json
{
  "apps": [
    {
      "script": "index.js",
      "instances": "max",
      "exec_mode": "cluster"
    }
  ]
}
```

Let’s start the cluster :

```
pm2 start app.json

```

![](media/1_YGBhlZ5OlsIoCtMfUM4cxg.png)

Yes, my machine has 4 available CPUs and PM2 has used all of them to serve the application with the same shared port, this simple edit in the execution mode give our application more performance and reliability

For more information check PM2 [documentation](http://pm2.keymetrics.io/docs/usage/cluster-mode/#cluster-mode).
