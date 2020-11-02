---
title: "Getting started with Voice Driven Applications using Node.js"
date: 2018-08-17T22:12:03.284Z
template: "post"
draft: false
slug: "get-started-with-voice-driven-applications-using-node-js"
category: "Node.js"
tags:
  - "node.js"
  - "google"
  - "voice"
description: "Voice-activated applications used to be the stuff that science fiction was made of, but not anymore. Today, these applications are readily used on a daily basis by adults and children alike for both business and personal uses..."
socialImage: "media/1_HgYF11l9qlcHbcF4I8dt2w.jpeg"
---


> Voice-activated applications used to be the stuff that science fiction was made of, but not anymore. Today, these applications are readily used on a daily basis by adults and children alike for both business and personal uses. — unknown

Everyday the world tends to become an amazing place due to the science and technologies’s big progress.this progress is driven by huge amount of tools that we use everyday .

One of the best example of those amazing things are the personal assistant apps, these virtual creatures are really astonishing and can do many things to help you either in personal and professional daily life, the major advantage of this kind of applications is their ability of voice interaction with the
user.

The voice driven applications are then the best solution to accomplish your daily mechanical tasks due to their high performance and
intuitiveness.

Here is a great video of Google Assistant Demo in Google I/O 2018 :

<iframe width="560" height="315" src="https://www.youtube.com/embed/d40jgFZ5hXk"
frameborder="0"
allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
allowfullscreen></iframe>

Google Assistant can Also helps you to :

- Make calls /messaging
- Google something very quickly (search for near restaurant / routes / pharmacies).
- Set alarms
- Check the weather
- Describe your personality
- Tell you a jokes
- …

So Today I decide to play around the speech recognition and see how can I hack something :) for the web.

I will create a remote control application to control a video player using voice in an HTML page.

The Javascript API for [speech recognition](https://w3c.github.io/speech-api/speechapi.html) makes the voice manipulation easier for web pages. The only requirement for that and especially when using google chrome browser is the web page should be served in a secure protocol (HTTPs).

So the first thing we have to do is to create a secure localhost using node.js

```
//make the project directory
mkdir remote-control-with-speech-recognition && cd remote-control-with-speech-recognition
// initialize the npm
npm init
// install required package
npm install https express

```

After that we have to generate the _privatekey.pem_ and _certificate.pem_ files using the following commands :

```
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

Creating the server file :

```
// create a server.js file
touch server.js
```

```javascript
const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();
app.use(express.static(__dirname + "/public"));

const privateKey = fs.readFileSync("privatekey.pem").toString();
const certificate = fs.readFileSync("certificate.pem").toString();

const httpOptions = { key: privateKey, cert: certificate };
https.createServer(httpOptions, app).listen(8000, () => {
  console.log(">> Serving on " + 8000);
});
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
```

Creating index.html in public directory :

```
// create a public/index.html file
mkdir public && cd public && touch index.html

```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Speech recognition video control</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <video
      id="video"
      controls=""
      preload="none"
      muted="”muted”"
      poster="https://media.w3.org/2010/05/sintel/poster.png"
    >
      <source
        id="mp4"
        src="https://media.w3.org/2010/05/sintel/trailer.mp4"
        type="video/mp4"
      />
      <source
        id="webm"
        src="https://media.w3.org/2010/05/sintel/trailer.webm"
        type="video/webm"
      />
      <source
        id="ogv"
        src="https://media.w3.org/2010/05/sintel/trailer.ogv"
        type="video/ogg"
      />
      <p>Your user agent does not support the HTML5 Video element.</p>
    </video>
    <p>
      Say : Play / Stop / Mute / Unmute
    </p>
    <script src="RemoteControl.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```

Creating main.js and RemoteControl.js files in public directory :

```
// create a public/main.js file
 touch main.js
```

```js
var video = document.querySelector("#video");

var remoteControl = new RemoteControl(video);
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      if (event.results[i][0].transcript.trim() == "play") {
        remoteControl.play();
      }
      if (event.results[i][0].transcript.trim() == "stop") {
        remoteControl.stop();
      }
      if (event.results[i][0].transcript.trim() == "mute") {
        remoteControl.mute();
      }
      if (event.results[i][0].transcript.trim() == "unmute") {
        remoteControl.unmute();
      }
      console.info(`You said : ${event.results[i][0].transcript}`);
    }
  }
};
```

```
// create a public/RemoteControl.js file
touch RemoteControl.js
```

```js
class RemoteControl {
  constructor(element) {
    this.videoElement = element;
  }

  play() {
    this.videoElement.play();
  }
  stop() {
    this.videoElement.pause();
    this.videoElement.currentTime = 0;
  }
  mute() {
    this.videoElement.muted = true;
  }
  unmute() {
    this.videoElement.muted = false;
  }
}
```

Save your work and then run the app

```
node server.js

```

Goto https://localhost:8000

You will see this :

![s1](media/1_h3YboNd4YmvJzOFnV54VzQ.jpeg)

Click on advanced :

![s2](media/1_74wB1up3KDuYJv6DBZAZbQ.png)

And then Proceed to localhost (unsafe)

![s3](media/1_Bksq-xaS0ByW6d9qlSk4aw.png)

Here we go !you can control this video using your voice try to Say :play/stop/mute/unmute

You can also grab the code from [Github](https://github.com/AbderrahimSoubaiElidrissi/remote-control-with-speech-recognition) ..

Happy hacking!
