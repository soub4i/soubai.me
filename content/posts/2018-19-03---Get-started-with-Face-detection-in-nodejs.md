---
title: Get started with Face detection in nodejs
date: 2018-03-25T22:40:32.169Z
template: "post"
draft: false
slug: "Get-started-with-Face-detection-in-nodejs"
category: "node.js"
tags:
  - "node.js"
  - "AI"
description: "NodeJS is a great technology for web/IoT projects it’s fast , resources friendly and beautiful. Also among its qualities there is code re-usability and we should says thank to NPM..."
socialImage: "media/1_uRUhqr7qxE8kaNZ9TpHWbw.png"
---

NodeJS is a great technology for web/IoT projects it’s fast , resources friendly and beautiful. Also among its qualities there is code re-usability and we should says thank to NPM.

Node package manager (NPM) is a great tool for every JavaScript developer it’s provides a million of packages that can be used in your projects.

Today I want to share a simple tutorial on how to get started with face detecting in nodejs. Hence i’ll be using a nodejs package named face-recognition created and maintained by the awesome Vincent Mühler the package provide

> Simple Node.js API for robust face detection and face recognition. This a Node.js wrapper library for the face detection and face recognition tools implemented in dlib.

Required libs for Linux and OSX :

```
cmake (sudo apt-get install cmake)

libx11 (XQuartz on OSX) for the dlib GUI (sudo apt-get install libx11-dev)

libpng for reading images (sudo apt-get install libpng-dev)
```

Let’s have fun :

```
npm install face-recognition
```

create new file index.js and open the project in your favorite code editor (mine is VS Code)

```
touch index.js && code .

```

past this code on your index.js

```javascript
const fr = require("face-recognition");
// load image from local
const image = fr.loadImage("image.jpg");
// intialize the window to showup your image
const win = new fr.ImageWindow();
// intialize face detector
const detector = new fr.FrontalFaceDetector();
// get the upscaled version of the supplied image
const sacaledimg = fr.pyramidUp(image);
// detect faces and returns all rects object (faces dimensions)
const gotFaceRects = detector.detect(sacaledimg);
// supply image to the window
win.setImage(image);
// draw rectangles over the image
const f = 0.5;
const faceRects = gotFaceRects.map(
  rect =>
    new fr.Rect(rect.left * f, rect.top * f, rect.right * f, rect.bottom * f)
);
faceRects.forEach(r => {
  win.addOverlay(r);
});
// pause the program until you hit Enter
fr.hitEnterToContinue();
```

Results :

```
// in your terminal run
node index.js
```

before
![type-through-time.jpg](media/1_uRUhqr7qxE8kaNZ9TpHWbw.png)

After
![type-through-time.jpg](media/1_YXA8ViCUA8E026fe3Rke4w.png)
